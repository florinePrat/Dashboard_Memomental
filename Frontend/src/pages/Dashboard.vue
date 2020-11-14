<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div :class="getColumnLength(weeklyActiveUsers)">
        <stats-card>
          <div  class="icon-big text-center icon-success" slot="header"  @click="setFocus(weeklyActiveUsers)">
            <i :class="focus == weeklyActiveUsers ? 'ti-close' : 'ti-pulse'" />
          </div>
          <div class="numbers" slot="content">
            <p>Weekly users</p>
            {{ weeklyActiveUsers.count }}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> 1min ago
          </div>
        </stats-card>
      </div>
      <div :class="getColumnLength(otherThing)">
        <stats-card>
          <div class="icon-big text-center icon-danger" slot="header" @click="setFocus(otherThing)">
            <i class="ti-eye" />
          </div>
          <div class="numbers" slot="content">
            <p>Other things</p>
            45
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> 1min ago
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row" v-if="focus == null">
      <div class="col-12">
        <chart-card
          title="Users behavior"
          sub-title="24 Hours performance"
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
        >
          <span slot="footer">
            <i class="ti-reload" /> Updated 3 minutes ago
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Open
            <i class="fa fa-circle text-danger" /> Click
            <i class="fa fa-circle text-warning" /> Click Second Time
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          title="Email Statistics"
          sub-title="Last campaign performance"
          :chart-data="preferencesChart.data"
          chart-type="Pie"
        >
          <span slot="footer">
            <i class="ti-timer" /> Campaign set 2 days ago</span
          >
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Open
            <i class="fa fa-circle text-danger" /> Bounce
            <i class="fa fa-circle text-warning" /> Unsubscribe
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          title="2015 Sales"
          sub-title="All products including Taxes"
          :chart-data="activityChart.data"
          :chart-options="activityChart.options"
        >
          <span slot="footer">
            <i class="ti-check" /> Data information certified
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info" /> Tesla Model S
            <i class="fa fa-circle text-warning" /> BMW 5 Series
          </div>
        </chart-card>
      </div>
    </div>

    <!--Focus-->
    <div class="row" v-if="focus == weeklyActiveUsers">
      <div class="col-md-6 col-xl-3" v-for="nb in LEAGUES" :key="nb">
        <stats-card>
          <div class="icon-big text-center icon-warning" slot="header" @click="setSubFocus(nb)">
            <i class="ti-crown" />
          </div>
          <div class="numbers" slot="content">
            <p>League {{nb}}</p>
            {{ countLeague(nb) }}
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload" /> 1min ago
          </div>
        </stats-card>
      </div>
    </div>

    <div class="row" v-if="subFocus != null">
        <div class="col-12">
        <card :title="'League ' + subFocus" subTitle="Joueurs de cette semaine">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="filteringLeague(subFocus)" :columns="COLUMNS">

            </paper-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { StatsCard, ChartCard, PaperTable } from "@/components/index";
import Chartist from "chartist";
import { getWeekPosition } from "../utils/users/getWeekPosition";

export default {
  components: {
    StatsCard,
    ChartCard,
    PaperTable,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      weeklyActiveUsers: { count: 0, details: null },
      otherThing: { count: 5, details: null },
      focus: null,
      subFocus: null,
      LEAGUES: [0,1,2,3],
      COLUMNS: ["_id","weekName","weekPosition","weekScore","league"],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM",
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410],
          ],
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795],
          ],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      preferencesChart: {
        data: {
          labels: ["62%", "32%", "6%"],
          series: [62, 32, 6],
        },
        options: {},
      },
    };
  },
  mounted() {
    getWeekPosition()
      .then((res) => {
        this.weeklyActiveUsers.count = res.data.position.weekPositions.length;
        this.weeklyActiveUsers.details = res.data.position.weekPositions;
        console.log(this.weeklyActiveUsers.details)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    setFocus(item) {
      if (this.focus == null) {
        this.focus = item;
      } else {
        this.focus = null;
      }
    },
    setSubFocus(item) {
      if (this.subFocus == null) {
        this.subFocus = item;
      } else {
        this.subFocus = null;
      }
    },
    getColumnLength(item) {
      if(this.focus == null){
        return 'col-md-6 col-xl-3'
      }
      else {
        if(this.focus == item) {
          return 'col-md-12'
        }
        else{
          return 'col-md-6 col-xl-3 is-not-active'
        }
      }
    },
    filteringLeague(league) {
      let res = this.weeklyActiveUsers.details.filter((position) => {
        return position.league == league;
      });
      console.log(res);
      return res;
    },
    countLeague(league) {
      return this.filteringLeague(league).length;
    }
  },
};
</script>
<style>
.is-not-active {
  display: none;
}
</style>
