<template>
  <div id="app">
    <div class="container">
      <img src="img/probablebanker.svg" alt="" class="logo">
      <!-- League Selector -->
      <div class="sticky">
          <div class="row tac">
              <ul class="leagues">
                  <li v-for="league in leagues" v-bind:class="['league', league.name]" v-bind:key="league._id">
                      <a href="" v-on:click.prevent="selectLeague(league.name)" v-bind:class="{ active: activeLeague==league.name }">
                          {{ league.name }}
                      </a>
                  </li>
              </ul>
          </div>
          <!--<transition name="fade" mode="out-in">-->
                <div v-if="showInfo" key="showInfo">
                    <div class="row">
                        <div class="col-6 padding">
                            <h2>Lorem Ipsum</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus id commodi, aperiam, voluptatibus necessitatibus incidunt ut magni dolores voluptatem provident natus tempore architecto voluptas enim accusantium vel quas corrupti dolore.</p>
                            <h2>Lorem Ipsum</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus id commodi, aperiam, voluptatibus necessitatibus incidunt ut magni dolores voluptatem provident natus tempore architecto voluptas enim accusantium vel quas corrupti dolore.</p>
                            <h2>Lorem Ipsum</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus id commodi, aperiam, voluptatibus necessitatibus incidunt ut magni dolores voluptatem provident natus tempore architecto voluptas enim accusantium vel quas corrupti dolore.</p>  
                        </div>
                    </div>
                </div>
                <div v-else key="showGames">
                    <div class="games row">
                        <a href="" @click.prevent="upcoming=true; selectLeague(activeLeague)" v-bind:class="['upcoming-link', { active: upcoming }]">UPCOMING</a>
                        <a href="" @click.prevent="upcoming=false; selectLeague(activeLeague)" v-bind:class="['upcoming-link', { active: !upcoming }]">HISTORY</a>
                    </div>
                    <!-- Heading row -->
                    <div class="games row header" v-if="typeof(activeGames) === 'undefined' || activeGames === null || activeGames.length > 0">
                        <div class="col col-2"></div>
                        <div class="col col-3 oddsblocks header">
                            <div class="oddsblock one-third tac">1</div>
                            <div class="oddsblock one-third tac">X</div>
                            <div class="oddsblock one-third tac">2</div>
                        </div>
                        <div class="col col-1"></div>
                    </div>
                    <div class="game row" v-else>
                        <div class="col col-6 tac italic" v-if="upcoming">No upcoming games</div>
                        <div class="col col-6 tac italic" v-else>No history</div>
                    </div>
                    <div class="games test">
                        <!-- Loop through active games -->
                        <transition-group name="fade">
                             <game v-for="(gameItem) in activeGames" :game="gameItem" :upcoming="upcoming" :activedate="activeDate" :toggled="false" :toggledDates="toggledDates" :key="gameItem._id" @update-date="updateCurrentDate" @toggle-date="toggleCurrentDate"></game>
                        </transition-group>
                    </div>
                </div>
            <!--</transition>-->
        </div>
    </div>
    <!-- Footer -->
    <footer>Copyright © 2020 ProbableBanker. All rights reserved. <a href="" @click.prevent="showInfo=!showInfo;">Info</a>
    </footer>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Game
  },
  data () {
        return {
            games: null,
            activeGames: null,
            leagues: null,
            upcoming: true,
            showInfo: false,
            activeLeague: 'EN1',
            toggledDates: [],
            activeDate: null,
        }
    },
    methods: {
        /* Change league or upcoming / history */
        selectLeague(leagueName){
            this.showInfo = false;  
            this.activeLeague = leagueName;
            this.activeDate = '';
            this.toggledDates = [];
            this.activeGames = this.games.filter(game => {
                return (game.league.toLowerCase().includes(this.activeLeague.toLowerCase()) && ( (this.upcoming ? game.homeGoals == -1 : game.homeGoals > -1)))
            })
            // this.activeGames.sort( ( a, b) => {
            //     return new Date(a.gameDate) - new Date(b.gameDate);
            // });
            if( !this.upcoming && this.activeGames.length > 0 ) {
                this.toggleCurrentDate(this.activeGames[0].gameDate);
            }
            return this.activeGames;
        },    
        updateCurrentDate(activeDate) {
            this.activeDate = activeDate;
        },
        toggleCurrentDate(activeDate) {
            if( this.toggledDates.indexOf(activeDate) > -1 ) {
                this.toggledDates.splice(this.toggledDates.indexOf(activeDate), 1);
            } else {
                this.toggledDates.push(activeDate);
            }
        }   
    },
    mounted () {
        this.$http
            .get('/api/games')
            .then((response) => {
                this.games = response.data
                this.selectLeague('EN1')
            })
        this.$http
            .get('/api/leagues')
            .then(response => (this.leagues = response.data))
    }
}
</script>

<style>
.app {
    margin: 0 auto;
    max-width: 1200px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: green;
}
</style>
