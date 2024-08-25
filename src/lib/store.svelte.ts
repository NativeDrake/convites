import { SvelteSet } from "svelte/reactivity"

export const inviteStore = $state({
	parents: {
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
	},
	inviteMessage: 'Convidam para a celebração de matrimónio dos seus filhos',
	mainText: 'Cavulamine e José',
	monthYear: 'Setembro 2024',
	dayNumber: 21,
	dayName: 'Sábado',
	hour: 'às 16h00',
	bottomText: `“Deus mudou o teu caminho até juntares com o meu e guardou a tua vida 
parando-a para mim.
Para onde fores, irei, onde tu repousares, repousarei. Teu Deus será o meu 
Deus. Teu caminho o meu será” 

`,
	bottomTextOrigin: '- Rute 1: 16-1',


})

export const notificationStore = createNotificationStore()

type Notification = { message: string, type: 'error' | 'success' }
function createNotificationStore() {
	let notifications = $state<SvelteSet<Notification>>(new SvelteSet([]))


	return {
		items: notifications,
		add: (notification: Notification) => {
			notifications.add(notification);
			setTimeout(() => {
				notifications.delete(notification)
				console.log(notifications)
			}, 5000)
		}
	}
}
