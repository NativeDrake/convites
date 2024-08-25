<script>
	let { user, showForm, err } = $props();

	let changeMode = $state(showForm === true ? true : false);
</script>

<div>
	{#if user.confirmed === null || changeMode}
		{@render Form()}
	{:else}
		<div class="text-center">
			<p>
				Olá,
				<span class="font-bold">{user.fullName}</span>
			</p>

			{#if user.confirmed}
				<p class="font-bold text-success">Obrigado por confirmar :D</p>
			{:else}
				<p class="font-bold text-error">Lamentamos que não consegue :(</p>
			{/if}

			<button onclick={() => (changeMode = true)} class="btn btn-link">alterar</button>
		</div>
	{/if}
</div>

{#snippet Form()}
	<form method="POST" action="/convidados/{user.id}" class="flex gap-4 items-center">
		<div class="px-4 border-r w-full">
			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-4">
					<input
						type="radio"
						name="confirmed"
						class="radio checked:bg-success"
						checked={true}
						value={true}
					/>
					<span class="label-text">Confirmo</span>
				</label>
			</div>

			<div class="form-control">
				<label class="label cursor-pointer justify-start gap-4">
					<input type="radio" value={false} name="confirmed" class="radio checked:bg-red-500" />
					<span class="label-text">Não consigo</span>
				</label>
			</div>
			<input
				name="id"
				bind:value={user.id}
				type="text"
				class="hidden input input-bordered w-full max-w-xs"
			/>

			<input
				name="password"
				type="text"
				placeholder="Palavra passe"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</div>

		<button class="btn border-2 border-success hover:btn-success">Salvar</button>
	</form>
	{#if err}
		<p class="text-center mt-2 p-2 alert alert-error">{err}</p>
	{/if}
{/snippet}
