<script lang="ts">
	import AuthGuard from '$lib/components/AuthGuard.svelte';

	let { children } = $props();
</script>

<AuthGuard />

{@render children()}
