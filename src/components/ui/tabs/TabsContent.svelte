<script lang="ts">
  import { getContext } from 'svelte'
  import { cn } from '$lib/utils'

  export let value: string
  
  let className: string = ''
  export { className as class }

  const { activeTab } = getContext('tabs')
</script>

{#if $activeTab === value}
  <div
    class={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...$$restProps}
  >
    <slot />
  </div>
{/if}