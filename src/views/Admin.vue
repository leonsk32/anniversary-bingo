<template>
    <div>
        Answer
        <v-text-field v-model="submission"></v-text-field>
        <div style="width: 100%; height: 30px">
            <v-btn @click="submit" color="primary" style="position: absolute; left: 0">submit</v-btn>
            <v-btn @click="reset" color="error" style="position: absolute; right: 0">reset</v-btn>
        </div>
        <v-data-table
                :headers="headers"
                :items="answers"
                class="elevation-1"
                dense
        ></v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Firebase from '@/plugins/Firebase';

@Component
export default class Admin extends Vue {
  private answers: any[] = [];
  private submission: string = '';
  private headers = [
    {
      align: 'start',
      sortable: false,
      value: 'date',
    },
  ];

  public created() {
    Firebase.onAnswerSubmitted(
      (answer: string) => this.answers.push({date: answer}),
      (answer: string) => this.answers = this.answers.filter((value: any) => value.date !== answer),
    );
  }

  public submit() {
    Firebase.submitAnswer(this.submission);
    this.submission = '';
  }

  public reset() {
    Firebase.reset();
  }
}
</script>
<style scoped>
</style>
