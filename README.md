# Mutsuki Portfolio

Mutsuki 的个人网站：一名开发者，以及 galgame、动画与百合作品爱好者。

## 技术栈

Vue 3 + Vite + TypeScript + vue-i18n（中/英/日）+ simplex-noise

## 开发

```bash
pnpm install
pnpm run dev        # 本地开发
pnpm run type-check # 类型检查
pnpm run build      # 生产构建
```

## 部署

推送到 `main` 自动通过 GitHub Actions 构建并发布到 GitHub Pages（需在 Settings → Pages 选择 Source 为 GitHub Actions）。
