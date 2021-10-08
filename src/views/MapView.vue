<template>
  <main class="flex flex-wrap justify-center p-8">
    <div class="info text-black pt-12">
      <h2 @click="test">Select a country!</h2>
      <span></span>
      Population:
      <p></p>
    </div>
    <svg class="map"></svg>
  </main>
</template>
<script>
import * as d3 from "d3";
import store from "../store";

export default {
  name: "MapView",
  components: {},
  data() {
    return {
      d3Result: [],
      resData: [],
      africaCountries: [],
      countryFlags: [],
      countryPopulations: [],
      africaPopulations: [],
      africaFlags: [],
      minPopulation: null,
      maxPopulation: null,
    };
  },
  methods: {
    test() {
      console.log(this.$store.commit("setNumberWithComma", 156666));
    },
    draw() {
      return d3.json(
        "https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/africa.geojson"
      );
    },
    drawMap() {
      console.log("minPopulation" + this.minPopulation);

      var data = this.d3Result;

      // draw The svg
      const width = window.innerWidth * 0.7;
      const height = window.innerHeight * 0.6;
      const svg = d3.select(".map");

      // Map and projection
      const projection = d3
        .geoMercator()
        .scale(400) //scale：設定地圖縮放倍率
        .translate([width / 4, height / 1.5]);

      let geoGenerator = d3.geoPath().projection(projection);
      //d3.geoPath：將投影資料轉換為 path 的路徑

      let color = d3
        .scaleQuantize()
        .domain([this.minPopulation, this.maxPopulation])
        .range(d3.schemePurples[6]);

      let self = this;

      // Draw the map
      svg
        .append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("g")
        .attr("class", function(d) {
          return d.properties.name.replace(/\s*/g, "");
        })
        .append("path")
        .attr("data-population", function(d) {
          let population =
            self.africaPopulations[d.properties.name.replace(/\s*/g, "")];
          return self.setNumberWithComma(population);
        })
        .attr("data-flag", function(d) {
          let flag = self.africaFlags[d.properties.name.replace(/\s*/g, "")];
          return flag;
        })
        .attr("fill", "#69b3a2")
        .attr("d", geoGenerator)
        .style("stroke", "#fff")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseLeave);

      function handleMouseOver(e, d) {
        let centroid = geoGenerator.centroid(d);
        let population = d3.select(this).attr("data-population");
        let flag = d3.select(this).attr("data-flag");

        d3.select(".info>h2").html(d.properties.name);
        d3.select(".info>span").html(flag);
        d3.select(".info>p").html(population);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("fill", "yellow");
      }
      function handleMouseLeave(e, i) {
        e.preventDefault();

        d3.select(this)
          .transition()
          .duration(300)
          .attr("fill", "#69b3a2");
      }
    },
    async getFlagUnicode() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const result = await fetch(
        "https://countriesnow.space/api/v0.1/countries/flag/unicode",
        requestOptions
      );

      return result.json();
    },
    async getPopulation() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const result = await fetch(
        "https://countriesnow.space/api/v0.1/countries/population",
        requestOptions
      );

      return result.json();
    },
    mapAfricaPopulation() {
      this.africaPopulations = this.countryPopulations.reduce(
        (previous, current) => {
          if (this.africaCountries.includes(current.country)) {
            let country = current.country;
            let population = current.populationCounts.pop().value;
            // let selected = {};
            // console.log(current.populationCounts.pop());
            previous[country.replace(/\s*/g, "")] = population;
            // previous.push(selected);
            // console.log(result);
          }
          return previous;
        },
        {}
      );

      this.minPopulation = Math.min(...Object.values(this.africaPopulations));
      this.maxPopulation = Math.max(...Object.values(this.africaPopulations));

      console.log(this.africaPopulations);
    },
    mapAfricaFlags() {
      this.africaFlags = this.countryFlags.reduce((previous, current) => {
        if (this.africaCountries.includes(current.name)) {
          let country = current.name;
          let flag = current.unicodeFlag;
          previous[country.replace(/\s*/g, "")] = flag;
        }
        return previous;
      }, {});
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isPageLoading;
    },
  },
  created() {
    this.$store.commit("setLoading", true);

    Promise.all([this.draw(), this.getPopulation(), this.getFlagUnicode()])
      .then(([africa, population, flags]) => {
        let result = africa.features.map((i) => i.properties.name);
        this.d3Result = africa;
        this.africaCountries = result;

        this.countryPopulations = population.data;

        this.countryFlags = flags.data;

        return Promise.resolve();
      })
      .then(() => {
        this.mapAfricaPopulation();
        this.mapAfricaFlags();
        return Promise.resolve();
      })
      .then(() => {
        this.drawMap();
        return Promise.resolve();
      })
      .then(() => this.$store.commit("setLoading", false));
  },
};
</script>
<style lang="css">
.map {
  width: 60%;
  height: 100vh;
  cursor: pointor;
}

.info {
  width: 40%;
  text-align: center;
  color: #69b3a2;
  font-weight: 400;
  font-size: 40px;
}
</style>
