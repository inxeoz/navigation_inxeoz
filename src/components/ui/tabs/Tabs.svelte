<script lang="ts">
  import { setContext, createEventDispatcher } from 'svelte'
  import { writable } from 'svelte/store'
  import { cn } from '$lib/utils'

  export let value: string
  
  let className: string = ''
  export { className as class }

  const dispatch = createEventDispatcher()
  const activeTab = writable(value)
  
  setContext('tabs', { 
    activeTab,
    setValue: (newValue: string) => {
      activeTab.set(newValue)
      value = newValue
      dispatch('change', newValue)
    }
  })

  $: activeTab.set(value)
</script>

<div
  class={cn('', className)}
  {...$$restProps}
>
  <slot />
</div>