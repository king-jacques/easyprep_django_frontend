<script setup>
import Card from './Card.vue';
</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 class="text-2xl font-bold">For Students</h2>
            <p class="mt-2 mb-4">
              Prepare for your Exams with our AI assistant. Access practice tests and track your progress with detailed performance metrics.
            </p>
            <a
              href="jobs.html"
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Get Started
            </a>
        </Card>
        <Card bg="bg-green-100">
            <h2 class="text-2xl font-bold">For Tutors</h2>
            <p class="mt-2 mb-4">
              Provide personalized exam prep and track student progress with performance metrics. Easily identify areas for improvement and guide your students to success!
            </p>
            <a
              href="add-job.html"
              class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
            >
              Learn More
            </a>
        </Card>
        </div>
      </div>
    </section>
</template>