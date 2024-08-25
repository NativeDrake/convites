<script lang="ts">
	import '../app.css';
	import { notificationStore } from '$lib/store.svelte';

	const { children } = $props();

	let notifications = $derived(Array.from(notificationStore.items));
</script>

<svelte:head>
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inria+Serif:wght@700&display=swap');
	</style>
</svelte:head>

<div class="w-window h-window">
	{@render children()}

	<div
		class="absolute z-50 w-full bottom-8 flex flex-col gap-4 justify-center items-center bg-transparent"
	>
		{#each notifications as n}
			{#if n.type === 'error'}
				{@render AlertError(n.message)}
			{:else if n.type === 'success'}
				{@render AlertSuccess(n.message)}
			{/if}
		{/each}
	</div>
</div>

{#snippet AlertError(message)}
	<div role="alert" class="alert alert-error w-fit max-w-[600px]">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>
			{message}
		</span>
	</div>
{/snippet}

{#snippet AlertSuccess(message)}
	<div role="alert" class="alert alert-success w-fit max-w-[600px]">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 shrink-0 stroke-current"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<span>
			{message}
		</span>
	</div>
{/snippet}
