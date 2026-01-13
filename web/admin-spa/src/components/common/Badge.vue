<template>
  <span
    :class="[
      'ui-badge',
      `ui-badge--${variant}`,
      `ui-badge--${size}`,
      solid ? 'ui-badge--solid' : 'ui-badge--soft'
    ]"
  >
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'sm'
  },
  solid: {
    type: Boolean,
    default: false
  }
})

const allowedVariants = new Set([
  'primary',
  'secondary',
  'accent',
  'magenta',
  'success',
  'warning',
  'danger',
  'neutral'
])
const allowedSizes = new Set(['sm', 'md'])

const variant = computed(() => (allowedVariants.has(props.variant) ? props.variant : 'primary'))
const size = computed(() => (allowedSizes.has(props.size) ? props.size : 'sm'))
</script>

<style scoped>
.ui-badge {
  --ui-badge-rgb: 0 163 255;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  border-radius: 9999px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  user-select: none;
}

.ui-badge--sm {
  padding: 2px 10px;
  font-size: 12px;
  line-height: 18px;
}

.ui-badge--md {
  padding: 4px 12px;
  font-size: 13px;
  line-height: 18px;
}

.ui-badge--primary {
  --ui-badge-rgb: var(--primary-rgb);
}

.ui-badge--secondary {
  --ui-badge-rgb: var(--secondary-rgb);
}

.ui-badge--accent {
  --ui-badge-rgb: var(--accent-rgb);
}

.ui-badge--magenta {
  --ui-badge-rgb: var(--accent2-rgb);
}

.ui-badge--success {
  --ui-badge-rgb: var(--success-rgb);
}

.ui-badge--warning {
  --ui-badge-rgb: var(--warning-rgb);
}

.ui-badge--danger {
  --ui-badge-rgb: var(--error-rgb);
}

.ui-badge--neutral {
  --ui-badge-rgb: 100 116 139;
}

.ui-badge--soft {
  color: rgb(var(--ui-badge-rgb) / 0.9);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 0.84), rgb(255 255 255 / 0.72)) padding-box,
    linear-gradient(135deg, rgb(var(--ui-badge-rgb) / 0.35), rgb(var(--ui-badge-rgb) / 0.12))
      border-box;
  box-shadow:
    0 10px 20px -18px rgb(var(--ui-badge-rgb) / 0.55),
    inset 0 1px 0 rgb(255 255 255 / 0.6);
}

.dark .ui-badge--soft {
  color: rgb(var(--ui-badge-rgb) / 0.92);
  background:
    linear-gradient(180deg, rgb(2 6 23 / 0.55), rgb(2 6 23 / 0.35)) padding-box,
    linear-gradient(135deg, rgb(var(--ui-badge-rgb) / 0.35), rgb(var(--ui-badge-rgb) / 0.12))
      border-box;
  box-shadow:
    0 14px 26px -20px rgb(0 0 0 / 0.55),
    0 0 20px -16px rgb(var(--ui-badge-rgb) / 0.55);
}

.ui-badge--solid {
  color: white;
  background: linear-gradient(
    135deg,
    rgb(var(--ui-badge-rgb)) 0%,
    rgb(var(--ui-badge-rgb) / 0.7) 100%
  );
  box-shadow:
    0 16px 30px -20px rgb(var(--ui-badge-rgb) / 0.85),
    inset 0 1px 0 rgb(255 255 255 / 0.18);
}
</style>
