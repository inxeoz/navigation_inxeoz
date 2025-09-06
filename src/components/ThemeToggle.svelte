<script lang="ts">
  import { getContext } from 'svelte'
  import { Moon, Sun } from 'lucide-svelte'
  import Button from './ui/button/Button.svelte'

  const theme = getContext('theme')

  const toggleTheme = () => {
    theme.update((current: 'light' | 'dark') => current === 'light' ? 'dark' : 'light')
  }
</script>

<Button variant="ghost" size="icon" on:click={toggleTheme}>
  {#if $theme === 'light'}
    <Moon class="h-5 w-5 transition-transform duration-200" />
  {:else}
    <Sun class="h-5 w-5 transition-transform duration-200" />
  {/if}
  <span class="sr-only">Toggle theme</span>
</Button>