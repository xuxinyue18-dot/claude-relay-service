<template>
  <header class="ui-section-header">
    <div class="ui-section-header__left">
      <div v-if="icon || $slots.icon" class="ui-section-header__icon" :class="`ui-ih--${variant}`">
        <slot name="icon">
          <i :class="icon" />
        </slot>
      </div>
      <div class="min-w-0">
        <h2 class="ui-section-header__title header-title">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p v-if="subtitle || $slots.subtitle" class="ui-section-header__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>
    </div>
    <div v-if="$slots.actions" class="ui-section-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'primary'
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

const variant = computed(() => (allowedVariants.has(props.variant) ? props.variant : 'primary'))
</script>

<style scoped>
.ui-section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 2px 2px 10px;
}

.ui-section-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.ui-section-header__icon {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: white;
  border: 1px solid transparent;
  box-shadow:
    0 18px 30px -20px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgb(255 255 255 / 0.14) inset;
}

.ui-section-header__icon :deep(i) {
  font-size: 14px;
}

.ui-ih--primary {
  --a: var(--primary-rgb);
  --b: var(--secondary-rgb);
}

.ui-ih--secondary {
  --a: var(--secondary-rgb);
  --b: var(--accent2-rgb);
}

.ui-ih--accent {
  --a: var(--accent-rgb);
  --b: var(--primary-rgb);
}

.ui-ih--magenta {
  --a: var(--accent2-rgb);
  --b: var(--secondary-rgb);
}

.ui-ih--success {
  --a: var(--success-rgb);
  --b: var(--accent-rgb);
}

.ui-ih--warning {
  --a: var(--warning-rgb);
  --b: var(--secondary-rgb);
}

.ui-ih--danger {
  --a: var(--error-rgb);
  --b: var(--secondary-rgb);
}

.ui-ih--neutral {
  --a: 100 116 139;
  --b: 71 85 105;
}

.ui-section-header__icon {
  background: linear-gradient(135deg, rgb(var(--a)) 0%, rgb(var(--b)) 100%);
}

.ui-section-header__title {
  margin: 0;
  font-weight: 800;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.02em;
}

.ui-section-header__subtitle {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 18px;
  color: var(--text-secondary);
}

.ui-section-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
