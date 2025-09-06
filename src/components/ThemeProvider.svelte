<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let defaultTheme: 'light' | 'dark' = 'dark'

  const theme = writable<'light' | 'dark'>(defaultTheme)
  
  setContext('theme', theme)

  onMount(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (storedTheme) {
      theme.set(storedTheme)
    }

    const unsubscribe = theme.subscribe((currentTheme) => {
      localStorage.setItem('theme', currentTheme)
      document.documentElement.className = currentTheme
    })

    // Set initial theme
    document.documentElement.className = storedTheme || defaultTheme

    return unsubscribe
  })
</script>

<slot />