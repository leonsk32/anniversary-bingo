<template>
    <div>
        <v-container class="grey lighten-5">
            <v-row
                    no-gutters
                    v-for="k in 3"
                    :key="k"
            >
                <v-col
                        v-for="n in 3"
                        :key="n"
                >
                    <v-card
                            class="pa-2"
                            outlined
                            tile
                    >
                        <div class="date-box">
                            <p class="date">{{dates[k-1][n-1]}}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <input v-model="submission" background-color="red" style="margin-top: 100px"></input>
        <v-btn @click="submit">submit</v-btn>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Firebase from '@/plugins/Firebase';

@Component
export default class Bingo extends Vue {
  private dates = [['', '', ''], ['', '', ''], ['', '', '']];
  private answers: string[] = [];
  private submission: string = '';

  public created() {
    this.dates = this.$store.getters.getDates;
    Firebase.onAnswerSubmitted((answer: string) => this.answers.push(answer));
  }

  public submit() {
    Firebase.submitAnswer(this.submission);
  }
}
</script>
<style scoped>
    .pa-2 {
        width: 100%;
        padding-top: 100%;
    }

    .date-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: calc(50% - 2.25rem)
    }

    .date {
        font-size: 3rem;
        width: 100%;
        text-align: center;
        margin: 0 0;
    }
</style>
