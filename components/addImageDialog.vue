<template>
	<v-dialog
		:value="dialog"
		@click:outside="closeDialog()"
		width="800"
		:fullscreen="$vuetify.breakpoint.mobile">
		<v-card>
			<v-card-title>Upload Images
				<v-spacer></v-spacer>
				<v-btn
					icon
					@click="closeDialog()"><v-icon>mdi-close</v-icon></v-btn>
			</v-card-title>
			<v-divider></v-divider>
			<v-container>
				<v-row
					justify="center"
					no-gutters>
					<v-col cols="8">
						<v-file-input
							placeholder="Select or drop image images"
							chips
							multiple
							@change="onFileChange"
							accept="image/*"
							prepend-icon="mdi-camera"
						></v-file-input>
					</v-col>
				</v-row>
				<v-row
					justify="center"
					no-gutters>                    
					<v-switch
						v-model="publicAccess"
						:label="publicAccess ? 'Public' : 'Private'"
					></v-switch>

				</v-row>
				<v-row
					justify="center"
					no-gutters>
					<v-btn
						color="primary"
						@click="uploadFiles()">Upload {{images.length}} Files</v-btn>

				</v-row>
			</v-container>
			
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data(){
		return{
			images: '',
			publicAccess: false
		}
	},
	methods: {
		closeDialog(){
			this.$emit('close-dialog')
		},
		onFileChange(e){
			this.images = e
		},
		uploadFiles(){
			const formData = new FormData()
			formData.append('publicAccess', this.publicAccess);            
			this.images.forEach(image => formData.append('images', image))

			this.$axios
				.post('/api/images', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					//   console.log(res.data)
					if (res.data.success) {
						this.$emit('close-dialog');
					} else {
						alert('An error has occured. Please view logs or try again.')
					}
				})
				.catch((err) => {
					console.error(err)
				})
		}
	},
	props: {
		dialog: {type: Boolean, default: false}
	}
}
</script>