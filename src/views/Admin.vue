<template>
    <div>
        Answer
        <v-select
                v-model="submission"
                :items="items"
        >
        </v-select>
        <div style="width: 100%; height: 30px">
            <v-btn @click="submit" color="primary" style="position: absolute; left: 0"
                v-bind:disabled="submission === ''"
            >submit</v-btn>
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
  private items = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31',
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

  public select(item: string) {
    this.submission = item;
  }
}
</script>
<style scoped>
</style>
