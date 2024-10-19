<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 text-center mb-8">Study Tools</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="flex border-b border-gray-200">
          <button
            v-for="tool in tools"
            :key="tool.id"
            @click="activeTool = tool.id"
            :class="[
              'flex-1 text-center py-4 px-4 text-sm font-medium focus:outline-none',
              activeTool === tool.id
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            {{ tool.name }}
          </button>
        </div>
        
        <div class="p-6">
          <!-- Generate Questions Form -->
          <form v-if="activeTool === 'generate'" @submit.prevent="handleGenerateQuestions" class="space-y-4">
            <div>
              <label for="prompt" class="block text-sm font-medium text-gray-700">Prompt</label>
              <textarea
                id="prompt"
                v-model="generateQuestions.prompt"
                rows="4"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              ></textarea>
            </div>
            <div>
              <label for="model" class="block text-sm font-medium text-gray-700">Model</label>
              <select
                id="model"
                v-model="generateQuestions.model"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select a model</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="davinci">Davinci</option>
                <option value="curie">Curie</option>
              </select>
            </div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Generate Questions
            </button>
          </form>

          <!-- Web Scraper Form -->
          <form v-if="activeTool === 'scraper'" @submit.prevent="handleWebScraper" class="space-y-4">
            <div>
              <label for="site" class="block text-sm font-medium text-gray-700">Site URL</label>
              <input type="url" id="site" v-model="webScraper.site" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" required>
            </div>
            <div>
              <label for="content" class="block text-sm font-medium text-gray-700">HTML Tags to Scrape</label>
              <select
                id="content"
                v-model="webScraper.content"
                multiple
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                required
              >
                <option value="p">Paragraphs (p)</option>
                <option value="h1">Headings 1 (h1)</option>
                <option value="h2">Headings 2 (h2)</option>
                <option value="h3">Headings 3 (h3)</option>
                <option value="a">Links (a)</option>
                <option value="img">Images (img)</option>
                <option value="ul">Unordered Lists (ul)</option>
                <option value="ol">Ordered Lists (ol)</option>
                <option value="table">Tables (table)</option>
              </select>
            </div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Start Scraping
            </button>
          </form>

          <!-- Upload to AWS Form -->
          <form v-if="activeTool === 'aws'" @submit.prevent="handleAWSUpload" class="space-y-4">
            <div>
              <label for="bucketName" class="block text-sm font-medium text-gray-700">Bucket Name</label>
              <input type="text" id="bucketName" v-model="awsUpload.bucketName" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm" required>
            </div>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="handleFileChange">
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Upload to AWS
            </button>
          </form>

          <!-- Import/Export Form -->
          <form v-if="activeTool === 'importexport'" @submit.prevent="handleImportExport" class="space-y-4">
            <div>
              <label for="fileType" class="block text-sm font-medium text-gray-700">File Type</label>
              <select id="fileType" v-model="importExport.fileType" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md">
                <option value=".pdf">.pdf</option>
                <option value=".json">.json</option>
                <option value=".csv">.csv</option>
              </select>
            </div>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-import" class="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                    <span>Upload a file</span>
                    <input id="file-import" name="file-import" type="file" class="sr-only" @change="handleFileChange">
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">
                  File type: {{ importExport.fileType }}
                </p>
              </div>
            </div>
            <div class="flex space-x-4">
              <button type="button" @click="handleImport" class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Import
              </button>
              <button type="button" @click="handleExport" class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Export
              </button>
            </div>
          </form>

          <!-- API Key Generation -->
          <div v-if="activeTool === 'apikey'" class="space-y-4">
            <button @click="generateApiKey" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Generate API Key
            </button>
            <div v-if="apiKey" class="mt-4 p-4 bg-gray-100 rounded-md">
              <div class="flex items-center justify-between">
                <div class="flex-1 mr-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <div class="flex items-center">
                    <input
                      :type="showApiKey ? 'text' : 'password'"
                      :value="apiKey"
                      readonly
                      class="flex-1 block w-full px-3 py-2 sm:text-sm border-gray-300 rounded-md bg-white"
                    />
                    <button
                      @click="toggleApiKeyVisibility"
                      class="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <eye-icon v-if="!showApiKey" class="h-5 w-5 text-gray-600" />
                      <eye-off-icon v-else class="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      @click="copyApiKey"
                      class="ml-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <copy-icon class="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EyeIcon, EyeOffIcon, CopyIcon } from 'lucide-vue-next'

const tools = [
  { id: 'generate', name: 'Generate Questions' },
  { id: 'scraper', name: 'Web Scraper' },
  { id: 'aws', name: 'Upload to AWS' },
  { id: 'importexport', name: 'Import/Export' },
  { id: 'apikey', name: 'API Key' },
]

const activeTool = ref('generate')

const generateQuestions = ref({
  prompt: '',
  model: '',
})

const webScraper = ref({
  site: '',
  content: [],
})

const awsUpload = ref({
  bucketName: '',
  file: null,
})

const importExport = ref({
  fileType: '.pdf',
  file: null,
})

const apiKey = ref('')
const showApiKey = ref(false)

const handleGenerateQuestions = () => {
  console.log('Generating questions:', generateQuestions.value)
  // Implement question generation logic here
}

const handleWebScraper = () => {
  console.log('Web scraping:', webScraper.value)
  // Implement web scraping logic here
}

const handleAWSUpload = () => {
  console.log('Uploading to AWS:', awsUpload.value)
  // Implement AWS upload logic here
}

const handleImportExport = () => {
  console.log('Import/Export:', importExport.value)
  // Implement import/export logic here
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (activeTool.value === 'aws') {
    awsUpload.value.file = file
  } else if (activeTool.value === 'importexport') {
    importExport.value.file = file
  }
}

const handleImport = () => {
  console.log('Importing file:', importExport.value)
  // Implement import logic here
}

const handleExport = () => {
  console.log('Exporting file:', importExport.value)
  // Implement export logic here
}

const generateApiKey = async () => {
  try {
    // Simulating an API call to generate a key
    const response = await new Promise(resolve => setTimeout(() => resolve({ data: { key: 'sk-' + Math.random().toString(36).substr(2, 20) } }), 1000))
    apiKey.value = response.data.key
    showApiKey.value = false
  } catch (error) {
    console.error('Error generating API key:', error)
    // Handle error (e.g., show an error message to the user)
  }
}

const toggleApiKeyVisibility = () => {
  showApiKey.value = !showApiKey.value
}

const copyApiKey = () => {
  navigator.clipboard.writeText(apiKey.value)
    .then(() => {
      // Optionally, you can show a "Copied!" message to the user
      console.log('API key copied to clipboard')
    })
    .catch(err => {
      console.error('Failed to copy API key: ', err)
    })
}
</script>

<style scoped>
/* Add any additional component-specific styles here */
</style>