<template>
    <div>
        <v-container style="margin-right: 0">
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
                        <div class="touch-date-box" @click="showList(k, n)"></div>
                        <div class="date-box">
                            <p class="date">{{dates[k-1][n-1]}}</p>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <div style="width: 100%; padding-top: 10px">
            <v-btn
                    style="width: 100%;"
                    v-bind:color="isCompleted ? 'primary' : 'disabled'"
                    @click="create"
                    v-bind:disabled="!isCompleted"
            >
                作成！！
            </v-btn>
        </div>
        <div id="overlay" v-if="isListVisible">
            <v-list
                    dense
                    style="max-height: 60%; overflow-y: auto"
            >
                <v-subheader>セットする日付を選んでください</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                    >
                        <v-list-item-content @click="select(item)">
                            <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Create extends Vue {
  private dates = [['', '', ''], ['', '', ''], ['', '', '']];
  private isListVisible = false;
  private items = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31',
  ];
  private selected = [0, 0];
  private isCompleted = false;

  public showList(k: number, n: number) {
    this.isListVisible = true;
    this.selected = [k, n];
  }

  public select(item: string) {
    this.isListVisible = false;
    const row = this.selected[0] - 1;
    const col = this.selected[1] - 1;
    const before = this.dates[row][col];
    this.dates[row][col] = item;

    this.items = this.items.filter((i) => i !== item);
    if (before !== '') {
      this.items.push(before);
      this.items.sort(((a, b) => Number(a) - Number(b)));
    }

    this.isCompleted = this.items.length === 22;
  }

  public create() {
    this.$store.commit('setDates', this.dates);
    this.$router.push('/bingo');
  }
}
</script>
<style scoped>
    .pa-2 {
        width: 100%;
        padding-top: 100%;
    }

    .touch-date-box {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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

    #overlay {
        z-index: 100;

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
