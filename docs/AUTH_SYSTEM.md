# XHS Downloader 用戶認證系統設計

## 🎯 核心問題
付款後如何知道「這個人是誰」？如何防止「付費後別人盜用」？

## 💡 推薦方案：OAuth + Stripe 綁定

### 架構圖
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Google    │     │   Stripe    │     │   Our DB    │
│   Login     │────▶│   Payment   │────▶│  User Record│
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       │         JWT Session                   │
       └───────────────────────────────────────┘
```

## 🔧 實現步驟

### 1. 用戶登入（付費前）

**支持方式（從易到難）：**

| 方式 | 難度 | 適合場景 | 香港用戶覆蓋 |
|:---|:---|:---|:---|
| **Google OAuth** | ⭐ 最簡單 | 國際用戶 | 70% |
| **Email + Magic Link** | ⭐⭐ 簡單 | 不想記密碼 | 90% |
| **GitHub OAuth** | ⭐⭐ 簡單 | 技術用戶 | 40% |
| **WeChat 微信** | ⭐⭐⭐⭐ 複雜 | 大陸用戶為主 | 30%（香港）|
| **Alipay 支付寶** | ⭐⭐⭐⭐ 複雜 | 中國市場 | 50%（香港）|

**推薦先做：Google OAuth（最快 30分鐘搞定）**

### 2. Google OAuth 配置（Vercel + NextAuth.js）

**安裝：**
```bash
npm install next-auth
```

**設置環境變數（.env.local）：**
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=隨機字串（openssl rand -base64 32）

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**創建 API 路由（app/api/auth/[...nextauth]/route.ts）：**

```typescript
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // 將用戶ID和訂閱狀態加入session
      session.user.id = user.id;
      session.user.tier = user.tier;
      session.user.subscriptionStatus = user.subscriptionStatus;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

### 3. 數據庫設計（Prisma 示例）

```prisma
// schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  
  // 訂閱信息
  tier          String    @default("free") // free, monthly, lifetime
  subscriptionStatus String @default("inactive") // active, inactive, cancelled
  
  // Stripe 綁定
  stripeCustomerId   String?  @unique
  stripeSubscriptionId String?
  
  // 付款記錄
  payments      Payment[]
  
  // 使用統計
  downloadsToday Int @default(0)
  lastDownloadAt DateTime?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Payment {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  
  stripePaymentIntentId String?
  amount          Int      // 美分
  currency        String   @default("usd")
  status          String   // succeeded, failed, refunded
  
  tier            String   // monthly, lifetime
  createdAt       DateTime @default(now())
}

// NextAuth 需要的表
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 4. 付款流程整合

**步驟 A：用戶登入後才顯示付費按鈕**

```typescript
// 檢查是否登入
import { useSession } from 'next-auth/react';

function PricingCard({ tier }) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <Loading />;
  
  if (tier.id !== 'free' && !session) {
    return (
      <button onClick={() => signIn('google')}>
        先登入以訂閱
      </button>
    );
  }
}
```

**步驟 B：創建 Stripe Checkout Session 時綁定用戶ID**

```typescript
// app/api/checkout/route.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return Response.json({ error: 'Please login first' }, { status: 401 });
  }
  
  const { priceId } = await req.json();
  
  // 創建或獲取 Stripe Customer
  let customerId = session.user.stripeCustomerId;
  
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: {
        userId: session.user.id,
      },
    });
    customerId = customer.id;
    
    // 更新數據庫
    await prisma.user.update({
      where: { id: session.user.id },
      data: { stripeCustomerId: customerId },
    });
  }
  
  // 創建 Checkout Session
  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: tierId === 'lifetime' ? 'payment' : 'subscription',
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pricing`,
    metadata: {
      userId: session.user.id,
      tier: tierId,
    },
  });
  
  return Response.json({ sessionId: checkoutSession.id });
}
```

### 5. Webhook 處理付款成功

```typescript
// app/api/webhooks/stripe/route.ts

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }
  
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;
      
      // 🎯 關鍵：更新用戶訂閱狀態
      await prisma.user.update({
        where: { id: userId },
        data: {
          tier: tier,
          subscriptionStatus: 'active',
          stripeSubscriptionId: session.subscription || null,
        },
      });
      
      break;
    }
    
    case 'customer.subscription.deleted': {
      // 處理退訂（月付取消）
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      
      await prisma.user.update({
        where: { stripeCustomerId: customerId },
        data: {
          tier: 'free',
          subscriptionStatus: 'cancelled',
        },
      });
      
      break;
    }
  }
  
  return Response.json({ received: true });
}
```

### 6. 前端使用（檢查權限）

```typescript
// 在每次下載前檢查
async function checkDownloadPermission(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tier: true, downloadsToday: true },
  });
  
  const limits = USER_TIERS[user.tier];
  
  if (user.downloadsToday >= limits.maxDownloadsPerDay) {
    throw new Error('Daily limit reached');
  }
  
  // 更新計數
  await prisma.user.update({
    where: { id: userId },
    data: { 
      downloadsToday: { increment: 1 },
      lastDownloadAt: new Date(),
    },
  });
}
```

## ⚡ 快速啟動方案

**如果你急著上線（48小時）：**

1. **今日（Hour 0-4）：**
   - 使用 Clerk.com（比 NextAuth 更快）
