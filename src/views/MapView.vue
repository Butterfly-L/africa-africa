<template>
  <div class="flex flex-wrap justify-center">
    <div
      class="info text-black text-2xl text-center"
      :class="[isMobile ? 'w-full' : 'w-2/5 pt-12']"
    >
      <span class="text-5xl"></span>
      <h2>Select a country!</h2>
      <p class="pt-2"></p>
    </div>
    <svg
      class="map h-screen cursor-pointer"
      :class="[isMobile ? 'w-full' : 'w-3/5']"
      viewBox="420 130 150 350"
      preserveAspectRatio="xMinYMin"
    ></svg>
  </div>
</template>
<script>
import * as d3 from "d3";

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
      currentCountry: "",
    };
  },
  methods: {
    getAfricaCountries() {
      return d3.json(
        "https://raw.githubusercontent.com/codeforgermany/click_that_hood/master/public/data/africa.geojson"
      );
    },
    drawMap() {
      var data = this.d3Result;

      const width = window.innerWidth * 0.7;
      const height = window.innerHeight * 0.6;
      const svg = d3.select(".map");
      if (this.isMobile) svg.attr("viewBox", "430 130 190 250");

      const projection = d3.geoMercator();

      let geoGenerator = d3.geoPath().projection(projection);

      let color = d3
        .scaleQuantize()
        .domain([this.minPopulation, this.maxPopulation])
        .range(d3.schemePurples[6]);

      let self = this;

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
          return self.$_setNumberWithComma(population);
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
        let population = d3.select(this).attr("data-population");
        let flag = d3.select(this).attr("data-flag");

        d3.select(".info h2").html(d.properties.name);
        d3.select(".info span").html(flag);

        let populationText = population
          ? `Population: + ${population}`
          : "Sorry, we don't have data yet. &#128542;";

        d3.select(".info p").html(populationText);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("fill", "yellow");
      }
      function handleMouseLeave(e, i) {
        d3.select(".info h2").html("Select a country!");
        d3.select(".info span").html("");
        d3.select(".info p").html("");

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
    isMobile() {
      return this.$_isMobile();
    },
    isMobileStyle() {
      let style = this.$_isMobile() ? "flex-col items-center" : "";
      console.log("style" + style);
      return style;
    },
  },
  created() {
    this.$store.commit("setLoading", true);

    Promise.all([
      this.getAfricaCountries(),
      this.getPopulation(),
      this.getFlagUnicode(),
    ])
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
.info {
  min-height: 120px;
}
</style>
