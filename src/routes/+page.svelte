<script lang="ts">
	//import { findUser } from '$lib/db';
	import { onMount } from 'svelte';

	let showExtraInfo = $state(false);

	const parents = {
		g1: {
			name1: 'Myriam Joaquim',
			name2: 'Joaquim Caingona',
			name3: 'Myriam Cassange Joaquim',
			name4: 'Joaquim Bernardo Caingona'
		},
		g2: {
			name1: 'Rita e Amélia Teixeira',
			name2: 'Carlos e José Trindade',
			name3: 'Rita Teixeira/Amélia Teixeira',
			name4: 'Carlos Trindade/José Trindade'
		}
	};
	const inviteMessage = 'Convidam para a celebração de matrimóniodos seus filhos';
	const mainText = 'Cavulamine e José';
	const monthYear = 'Setembro 2024';
	const dayNumber = 21;
	const dayName = 'Sábado';
	const hour = 'às 16h00';
	const bottomText = `“Deus mudou o teu caminho até juntares com o meu e guardou a tua vida 
parando-a para mim.
Para onde fores, irei, onde tu repousares, repousarei. Teu Deus será o meu 
Deus. Teu caminho o meu será” 

`;
	const bottomTextOrigin = '- Rute 1: 16-1';

	function verifyUser() {
		let all: any;
		try {
			//		all = findUser();
			console.log({ all });
		} catch (err) {
			console.log({ err });
		}
	}

	onMount(verifyUser);
</script>

<div class="app-container relative flex flex-col items-center justify-center gap-4 w-full h-screen">
	<h1 class="text-2xl font-bold text-opacity-70 text-center m-4">
		<a href="convidados" class="link">ver convidados</a>
	</h1>

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
					<p>{parents.g1.name1}</p>
					<p>{parents.g1.name2}</p>
				</div>
				<div class="group1 text-right">
					<p>{parents.g2.name1}</p>
					<p>{parents.g2.name2}</p>
				</div>
			</section>

			<section class="invite-message text-center mt-8 flex flex-col items-center justify-center">
				<p class="max-w-72">{inviteMessage}</p>
			</section>

			<section class="main-text mt-12 text-5xl sm:text-7xl text-center">
				<p>{mainText}</p>
			</section>

			<section
				class="date text-xl font-bold flex flex-col justify-center items-center text-center mt-12 text-accent"
			>
				<p>{monthYear}</p>
				<p class="pr-3 pt-2">{dayNumber}</p>
				<div class="flex p-4 w-fit">
					<p class="pr-8 py-1">{dayName}</p>
					<p class="pl-8 py-1 border-l-4 border-dotted border-accent">{hour}</p>
				</div>
			</section>

			<section class="bottom-text text-center flex flex-col items-center mt-10">
				<p class="italic max-w-96">
					{bottomText}
				</p>
				<p>
					{bottomTextOrigin}
				</p>
			</section>
		</div>
	</div>
</div>
{@render InfoModal(showExtraInfo)}

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

{#snippet InfoModal(show)}
	{#if show}
		<dialog id="info-modal" class="modal modal-open">
			<div class="modal-box p-0">
				<div class="p-4 flex justify-between gap-4 items-center border-b">
					<p>Detalhes</p>
					<button
						onclick={() => (showExtraInfo = false)}
						class="btn btn-sm btn-circle btn-error hover:scale-95">X</button
					>
				</div>

				<div class="content p-4">
					<p class="text-justify">Localização abaixo, basta clicar para abrir no google maps</p>
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

<style>
	.main-text {
		font-family: 'Great Vibes';
	}
	.date {
		font-family: 'Inria Serif';
	}
</style>
