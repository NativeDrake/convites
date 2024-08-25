<script lang="ts">
	import Presence from '$lib/components/Presence.svelte';

	import { onMount } from 'svelte';

	let { data } = $props();
	let users = $state<any[]>([]);
	let filter = $state<string>('');

	let filtered = $derived(users.filter((u) => u.fullName.includes(filter)));

	let selectedUser = $state();
	function selectUser(user: any) {
		selectedUser = user;
		console.log(user.id);
	}
	function clearSelectedUser() {
		selectedUser = undefined;
	}

	onMount(() => {
		console.log(data);
		users = data.users;
		users = new Array(10).fill(0).map((i, index) => data.users[i]);
		users.unshift(...data.users);
	});
</script>

<div class="app-container relative flex flex-col items-center justify-center gap-4 w-full h-screen">
	<header class="text-2xl font-bold text-opacity-70 text-center w-full max-w-[600px]">
		<div class="flex gap-4 justify-left items-center">
			<a href="/" class="btn btn-square border-base-300">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-house w-6 h-6"
					viewBox="0 0 16 16"
				>
					<path
						d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
					/>
				</svg>
			</a>
			<span class=""> Convidados </span>
			<span class="">({users.length})</span>
		</div>

		<label class="input input-bordered flex items-center gap-2 mt-4">
			<input bind:value={filter} placeholder="procurar" type="text" class="grow" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
			>
				<path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/>
			</svg>
		</label>
	</header>

	<div
		class="invite-container p-8 w-full h-full max-w-[600px] sm:max-h-[750px] border-2 shadow relative overflow-hidden"
	>
		<div class="inner-container border flex flex-col w-full h-full">
			<div class="overflow-x-auto">
				<table class="table table-zebra">
					<!-- head -->
					<thead>
						<tr>
							<th class="p-2">Nome</th>
							<th>Confirmado</th>
							<th class="hidden"></th>
						</tr>
					</thead>
					<tbody>
						<!-- row 1 -->
						{#each filtered as user}
							<tr class="hover">
								<td class="py-4">
									<a href="convidados/{user.id}" class="link font-bold">{user.fullName}</a>
									{#if user.par}
										<p class="font-sm">Par: {user.pair}</p>
									{/if}
								</td>
								<td class="">
									{#if user.confirmed === null}
										<span class="text-error"> Por confirmar</span>
									{:else if user.confirmed}
										<span class="text-success"> Confirmado :D</span>
									{:else}
										<span class="text-error">Indisponível :(</span>
									{/if}
								</td>
								<td class="hidden"
									><button onclick={() => selectUser(user)} class="btn btn-link font-light"
										>alterar</button
									></td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<!---->
<!-- {#if selectedUser != undefined} -->
<!-- 	{@render ConfirmPresenceModal(selectedUser)} -->
<!-- {/if} -->
<!---->
{#snippet ConfirmPresenceModal(user)}
	<dialog id="presence-modal" class="modal modal-open">
		<div class="modal-box p-0">
			<div class="p-4 flex justify-between gap-4 items-center border-b">
				<p>confirmar presença</p>
				<button onclick={clearSelectedUser} class="btn btn-sm btn-circle btn-error hover:scale-95"
					>X</button
				>
			</div>

			<div class="content p-4">
				<!-- <Presence {user}></Presence> -->
			</div>
		</div>
	</dialog>
{/snippet}
