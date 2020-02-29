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
                        <div
                                class="show-date-box"
                                v-bind:class="getState(k, n)"
                        >
                        </div>
                        <div class="date-box">
                            <p class="date">{{dates[k-1][n-1]}}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
    Firebase.onAnswerSubmitted(
      (answer: string) => this.answers.push(answer),
      (answer: string) => this.answers = this.answers.filter((value: string) => value !== answer),

    );
  }

  public submit() {
    Firebase.submitAnswer(this.submission);
  }

  public getState(k: number, n: number) {
    if (!this.isHit(k, n)) {
      return '';
    }

    if ((this.isHit(k, 1) &&
      this.isHit(k, 2) &&
      this.isHit(k, 3)) ||
      (this.isHit(1, n) &&
        this.isHit(2, n) &&
        this.isHit(3, n)) ||
      (k === n &&
        this.isHit(1, 1) &&
        this.isHit(2, 2) &&
        this.isHit(3, 3))) {
      return 'bingo';
    }

    return 'hit';
  }

  private isHit(k: number, n: number) {
    return this.answers.includes(this.dates[k - 1][n - 1]);
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

    .show-date-box {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .date {
        font-size: 3rem;
        width: 100%;
        text-align: center;
        margin: 0 0;
    }

    .bingo {
        background-color: rgba(0, 0, 255, 0.5) !important;
    }

    .hit {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
