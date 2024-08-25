<script lang="ts">
	import { goto } from '$app/navigation';
	import { inviteStore, notificationStore } from '$lib/store.svelte';
	import { onMount } from 'svelte';
	import Presence from '$lib/components/Presence.svelte';

	let showExtraInfo = $state(false);

	let { form, data } = $props();
	let user = $state();
	let showForm = $state(false);

	onMount(() => {
		user = data.user;
		if (form?.error === undefined) {
			showExtraInfo = false;
		} else {
			showExtraInfo = true;
			showForm = true;
			const message = form.error;
			const type = 'error';

			notificationStore.add({ message, type });
		}

		if (form?.success) {
			const message = form.success;
			const type = 'success';

			notificationStore.add({ message, type });
		}
	});
</script>

<div class="app-container relative flex flex-col items-center justify-center gap-4 w-full h-screen">
	<header
		class="text-opacity-70 m-4 flex gap-4 items-center w-full max-w-[600px]
		"
	>
		<a href="/convidados" class="btn btn-square border-2 border-base-300">
			{@render ArrowLeftIcon()}
		</a>
		{#if !user || user.confirmed === null}
			<button onclick={() => (showExtraInfo = true)} class="btn-link"
				>Confirme a sua presença</button
			>
		{:else}
			<div class="w-full">
				<p class="font-bold">
					{user.fullName}
				</p>
				<button onclick={() => (showExtraInfo = true)} class="btn-link">
					Presença:
					<span class="font-bold {user.confirmed ? 'text-success' : 'text-error'}">
						{user.confirmed ? 'Confirmada :)' : 'Não consegue :('}
					</span>
				</button>
			</div>
		{/if}
	</header>

	<div
		class="invite-container p-8 w-full h-full max-w-[600px] sm:max-h-[750px] border-2 shadow relative overflow-hidden"
	>
		<img
			src="/images/v1-img3.png"
			alt=""
			class="image absolute -bottom-4 -right-2 -rotate-12 opacity-80"
		/>

		<div class="controls absolute top-2 right-[45%] z-20">
			<button
				onclick={() => (showExtraInfo = true)}
				class="btn btn-circle border-2 border-base-300 hover:scale-95"
			>
				{@render PinMapIcon()}
			</button>
		</div>

		<div class="inner-container border flex flex-col w-full h-full">
			<section class="parents flex gap-4 justify-between mt-12 px-2">
				<div class="group1">
					<p>{inviteStore.parents.g1.name1}</p>
					<p>{inviteStore.parents.g1.name2}</p>
				</div>
				<div class="group1 text-right">
					<p>{inviteStore.parents.g2.name1}</p>
					<p>{inviteStore.parents.g2.name2}</p>
				</div>
			</section>

			<section class="invite-message text-center mt-8 flex flex-col items-center justify-center">
				<p class="max-w-72">{inviteStore.inviteMessage}</p>
			</section>

			<section class="main-text-font mt-12 text-7xl text-center">
				<p>{inviteStore.mainText}</p>
			</section>

			<section
				class="date text-xl main-serif-font flex flex-col justify-center items-center text-center mt-12 text-accent"
			>
				<p>{inviteStore.monthYear}</p>
				<p class="pr-3 pt-2">{inviteStore.dayNumber}</p>
				<div class="flex p-4 w-fit">
					<p class="pr-8 py-1">{inviteStore.dayName}</p>
					<p class="pl-8 py-1 border-l-4 border-dotted border-accent">{inviteStore.hour}</p>
				</div>
			</section>

			<section class="bottom-text text-center flex flex-col items-center mt-10">
				<p class="italic max-w-96">
					{inviteStore.bottomText}
				</p>
				<p>
					{inviteStore.bottomTextOrigin}
				</p>
			</section>
		</div>
	</div>
</div>
{@render InfoModal(showExtraInfo)}

{#snippet InfoModal(show)}
	{#if show}
		<dialog id="info-modal" class="modal modal-open">
			<div class="modal-box p-0">
				<div class="p-4 flex justify-between gap-4 items-center border-b">
					<p>confirmar presença</p>
					<button
						onclick={() => (showExtraInfo = false)}
						class="btn btn-sm btn-circle btn-error hover:scale-95">X</button
					>
				</div>

				<div class="content p-4">
					<Presence err={form?.error} {showForm} {user}></Presence>

					<div class="divider"></div>

					<iframe
						title="direções"
						class="w-full"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42140.01196250023!2d13.18421015058174!3d-8.92213980485813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f53a06f7b2b7%3A0x56127fa1337dd769!2sBelas%20Shopping!5e0!3m2!1sen!2sao!4v1724242365572!5m2!1sen!2sao"
						height="450"
						allowfullscreen={false}
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</dialog>
	{/if}
{/snippet}

{#snippet PinMapIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-pin-map"
		viewBox="0 0 16 16"
	>
		<path
			fill-rule="evenodd"
			d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"
		/>
		<path
			fill-rule="evenodd"
			d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
		/>
	</svg>
{/snippet}

{#snippet ArrowLeftIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="currentColor"
		class="bi bi-arrow-left-circle w-6 h-6"
		viewBox="0 0 16 16"
	>
		<path
			fill-rule="evenodd"
			d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
		/>
	</svg>
{/snippet}
