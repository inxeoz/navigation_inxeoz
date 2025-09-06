<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { cn } from '$lib/utils'

  export let value: string
  
  let className: string = ''
  export { className as class }

  const activeTab = writable(value)
  setContext('tabs', { activeTab })

  $: activeTab.set(value)
</script>

<div
  class={cn('', className)}
  {...$$restProps}
>
  <slot />
</div>