<template>
	<v-container>
		
		<v-row justify="center">
			<v-btn
				@click="imagesViewing = 'public'"
				color="primary"
				class="ma-1"
				:outlined="imagesViewing != 'public'"
			>Public</v-btn>
			<v-btn
				@click="imagesViewing = 'private'"
				color="primary"
				class="ma-1"
				:outlined="imagesViewing != 'private'"
			>Private</v-btn>
		</v-row>
		<v-row
			justify="center"
			v-if="imagesViewing == 'private' && !privateImages">
			<v-col
				cols="12"
			>
				<v-text-field
					v-model="privatePassword"
					label="Password for Private Images"></v-text-field>
			</v-col>
			<v-btn
				color="primary"
				class="ma-1"
				@click="getPrivateImages()">Load Private Images</v-btn>

		</v-row>
		<v-row
			v-if="images"
			no-gutters>
			
			<v-col
				cols="12"
				sm="6"
				md="4"
				v-for="(image, index) in images"
				:key="index+token">
				<v-hover>
					<template #default="{ hover }">
						<v-card
							class="ma-4 py-2 px-1"
							:elevation="hover ? 16 : 2"
							@click="dialog = true"
						>
							<v-img
								:src="imagesViewing == 'private' ? '/api/images/private/'+token+'/'+image : '/api/images/public/'+image"
								height="400px"
								contain></v-img>
							<v-card-title>Image Name - By Artist X</v-card-title>
							<v-card-subtitle>Image Price</v-card-subtitle>
						</v-card>
					</template>
				</v-hover>
			</v-col>
			
		</v-row>
		<v-row
			v-else
			justify="center">
			No Images Found. Try Uploading An Image :)

		</v-row>
	</v-container>
	
</template>

<script>

export default {
	computed: {
		images(){
			if(this.imagesViewing == 'private'){
				return this.privateImages;
			}else{
				return this.publicImages;
			}
		}
	},
	components: {
	},
	data(){
		return {
			publicImages: null,
			privateImages: null,
			imagesViewing: 'public',
			privatePassword: '',
			token: ''
		}
	},
	mounted(){
		this.getPublicImages()
	},
	methods: {
		getPublicImages(){
			this.$axios.get('/api/images/public/list').then((res)  =>{
				console.log(res.data);
				if(res.data.success){
					this.publicImages = res.data.fileNames;
				}else{
					alert(res.data.error);
				}
			}).catch((err)  =>  {
				console.error(err);
			})
		},
		// this uses a post request to maintain a level of security - passing a password through a GET is not recommended as it may show in DNS lookup records/queries
		getPrivateImages(){
			this.$axios.post('/api/images/private', {password: this.privatePassword}).then((res)  =>{
				if(res.data.success){
					this.privateImages = res.data.fileNames;
					this.token = res.data.token;
					console.log(res.data);
				}else{
					alert(res.data.error);
				}
			}).catch((err)  =>  console.error(err))
		}
	}
}
</script>
