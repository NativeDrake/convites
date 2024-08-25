<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const redirectDuration = 5;
	let countDown = $state(redirectDuration);

	function startCounter() {
		countDown--;

		if (countDown === 0) goto('/');
		setTimeout(startCounter, 1000);
	}

	onMount(startCounter);
</script>

<div class="app-container relative flex flex-col items-center justify-center gap-4 w-full h-screen">
	<div
		class="invite-container p-8 w-full h-full max-w-[600px] sm:max-h-[750px] border-2 shadow relative overflow-hidden"
	>
		<img
			src="/images/v1-img3.png"
			alt=""
			class="image absolute -bottom-4 -right-2 -rotate-12 opacity-80"
		/>

		<div class="inner-container border flex flex-col w-full h-full justify-center">
			<p class="text-center p-4">
				<span class="font-bold">
					Convidado não encontrado, se acha que é um erro por favor fale conosco em privado!
				</span>
				<br />
				<br />
				<br />
				<a href="/" class="link my-4"> A redicionar para a página inicial em... </a>
				<br />
				<br />
				{countDown}
			</p>
		</div>
	</div>
</div>
