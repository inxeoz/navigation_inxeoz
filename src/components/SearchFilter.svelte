<script lang="ts">
  import { Search } from 'lucide-svelte'
  import Input from './ui/input/Input.svelte'

  export let searchTerm: string = ''
</script>

<div class="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
  <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  <Input
    bind:value={searchTerm}
    placeholder="Search links, descriptions, or tags..."
    class="pl-10 w-full"
  />
</div>