<script lang="ts">
  import { getContext } from 'svelte'
  import { cn } from '$lib/utils'

  export let value: string
  export let title: string | undefined = undefined
  
  let className: string = ''
  export { className as class }

  const { activeTab, setValue } = getContext('tabs')

  const handleClick = () => {
    setValue(value)
  }
</script>

<button
  class={cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    $activeTab === value && 'bg-background text-foreground shadow-sm',
    className
  )}
  {title}
  on:click={handleClick}
  data-state={$activeTab === value ? 'active' : 'inactive'}
  {...$$restProps}
>
  <slot />
</button>