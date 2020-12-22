<template>
	<v-app >
		<v-app-bar
			fixed
			app
			color="primary"
			dark
		>
			<v-toolbar-title v-text="title" />
			<v-spacer></v-spacer>
			<v-btn
				@click="addImageDialog = !addImageDialog"
				outlined><v-icon>mdi-plus</v-icon>Image</v-btn>
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
		<v-footer
			app
		>
		</v-footer>
		<add-image-dialog 
			:dialog="addImageDialog"
			@close-dialog="addImageDialog = false"
		/>
	</v-app>
</template>

<script>
import addImageDialog from '../components/addImageDialog.vue'
export default {
	components: { addImageDialog },
	data () {
		return {
			title: 'Image Repository',
			addImageDialog: false
		}
	}
}
</script>
