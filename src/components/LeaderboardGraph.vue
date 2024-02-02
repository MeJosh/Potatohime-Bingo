<template>
  <div class="graph-container">
    <Bar
      id="bingo-leaderboard-graph"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTeamStore } from '@/stores/teams';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ChartDataLabels);

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
          datalabels: {
            formatter: (value: number) => `${value} Pts`,
            color: "#000000",
            size: "2em",
            anchor: "end",
            align: "left",
            font: {
              weight: "bold",
              size: "16"
            }
          },
          legend: {
            display: false,
          }
        },
        indexAxis: "y",
        scales: {
          y: {
            min: 0,
            max: useTeamStore().highestTeamScore() + 1,
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      const teamStore = useTeamStore();
      const labels = [];
      const points = [];

      for (const team of teamStore.teams) {
        labels.push(team.name);
        points.push(team.points);
      }

      return {
        labels: labels,
        datasets: [{ 
          label: "",
          data: points,
          yAxisId: "yAxis",
          backgroundColor: [
            "rgba(150, 33, 146, 1)",
            "rgba(82, 40, 204, 1)",
            "rgba(4, 51, 255, 1)",
            "rgba(0, 146, 146, 1)",
            "rgba(0, 249, 0, 1)",
            "rgba(255, 251, 0, 1)",
            "rgba(255, 199, 0, 1)",
            "rgba(255, 147, 0, 1)",
            "rgba(255, 80, 0, 1)",
            "rgba(255, 38, 0, 1)",
            "rgba(216, 34, 83, 1)",
          ],
          borderColor: [ "#000000" ],
          borderSkipped: false,
          borderWidth: 3
        }]
      };
    },
  }
}
</script>
<style>
.graph-container {
  margin: 0 auto;
  max-width: 90vw;
  background: lightgrey;
  border: 2px solid black;
  border-radius: 2em;
  padding: 20px;
}
</style>