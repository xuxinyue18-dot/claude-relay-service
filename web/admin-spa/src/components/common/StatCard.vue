<template>
  <div class="stat-card ui-stat-card">
    <div class="ui-stat-card__row">
      <div class="ui-stat-card__body">
        <p class="ui-stat-card__title">
          <slot name="title">{{ title }}</slot>
        </p>

        <div v-if="$slots.value || value !== undefined" class="ui-stat-card__value">
          <slot name="value">{{ value }}</slot>
        </div>

        <div v-if="$slots.default" class="ui-stat-card__extra">
          <slot />
        </div>

        <p v-if="$slots.subtitle || subtitle" class="ui-stat-card__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <div
        v-if="$slots.icon || icon"
        class="stat-icon ui-stat-card__icon"
        :class="`ui-si--${variant}`"
      >
        <slot name="icon">
          <i class="ui-stat-card__icon-i" :class="icon" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: undefined
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
.ui-stat-card__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ui-stat-card__body {
  flex: 1;
  min-width: 0;
}

.ui-stat-card__title {
  margin: 0 0 6px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  color: var(--text-secondary);
}

.ui-stat-card__value {
  font-size: 28px;
  line-height: 32px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.ui-stat-card__subtitle {
  margin: 10px 0 0;
  font-size: 12px;
  line-height: 16px;
  color: var(--text-secondary);
}

.ui-stat-card__extra {
  margin-top: 10px;
}

.ui-stat-card__icon {
  --a: var(--primary-rgb);
  --b: var(--secondary-rgb);
  background: linear-gradient(135deg, rgb(var(--a)) 0%, rgb(var(--b)) 100%);
}

.ui-stat-card__icon-i {
  font-size: 14px;
}

.ui-si--primary {
  --a: var(--primary-rgb);
  --b: var(--secondary-rgb);
}

.ui-si--secondary {
  --a: var(--secondary-rgb);
  --b: var(--accent2-rgb);
}

.ui-si--accent {
  --a: var(--accent-rgb);
  --b: var(--primary-rgb);
}

.ui-si--magenta {
  --a: var(--accent2-rgb);
  --b: var(--secondary-rgb);
}

.ui-si--success {
  --a: var(--success-rgb);
  --b: var(--accent-rgb);
}

.ui-si--warning {
  --a: var(--warning-rgb);
  --b: var(--secondary-rgb);
}

.ui-si--danger {
  --a: var(--error-rgb);
  --b: var(--secondary-rgb);
}

.ui-si--neutral {
  --a: 100 116 139;
  --b: 71 85 105;
}

@media (min-width: 640px) {
  .ui-stat-card__title {
    font-size: 13px;
    line-height: 18px;
  }

  .ui-stat-card__value {
    font-size: 30px;
    line-height: 36px;
  }

  .ui-stat-card__subtitle {
    font-size: 13px;
    line-height: 18px;
  }

  .ui-stat-card__icon-i {
    font-size: 16px;
  }
}
</style>
