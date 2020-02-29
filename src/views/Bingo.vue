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
                        <div class="date-box" @click="showList(k, n)">
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

@Component
export default class Bingo extends Vue {
  private dates = [['', '', ''], ['', '', ''], ['', '', '']];

  public created() {
    this.dates = this.$store.getters.getDates;
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

    #overlay {
        z-index: 1;

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
