<template>
    <div class="games">
        <!-- Date changed -> show date header-->
        <div class="date-header game row" v-if="checkDate === true" @click.prevent="toggleGames" v-once>
            <div class="col col-5 oddsblocks header">
                <div class="oddsblock col-6 tac">{{ dateToBeShown }}</div>
            </div>
            <div class="col col-1"></div>
        </div>
        <!--<transition-group name="slide">-->
            <div class="game-container" key="game._id">
                <div class="game row" @click.prevent="toggleInfo" v-if="checkToggled === true" :key="game._id">
                    <div class="col col-2 ">
                        <div class="col col-2 small-col-0"></div>
                        <div class="col col-2 small-col-6 tar small-tal">{{ game.homeTeam }}</div>
                        <div class="col col-2 small-col-6 ">- {{ game.awayTeam }}</div>
                    </div>
                    <div class="col col-3 oddsblocks">
                        <div class="oddsblock" v-bind:class="decideBlockColour('home', game.homeOdds, game)" :style="{ width: game.homeOdds + '%' }">{{ game.homeOdds }} %</div>
                        <div class="oddsblock tac" v-bind:class="decideBlockColour('draw', game.drawOdds, game)" :style="{ width: game.drawOdds + '%' }">{{ game.drawOdds }} %</div>
                        <div class="oddsblock tar" v-bind:class="decideBlockColour('away', game.awayOdds, game)" :style="{ width: game.awayOdds + '%' }">{{ game.awayOdds }} %</div>
                    </div>
                    <div class="col col-1">
                        <!-- Result -->
                        <div class="row">
                            <div class="col col-3 no-wrap icon-text" v-if="!upcoming">
                                {{ game.homeGoals }} - {{ game.awayGoals }}
                            </div>
                            <div :class="['col', 'col-3', 'icon', 'icon-left', game.fullSafeTag]" :title="fullSafeInfoText"></div>
                        </div>
                    </div>
                    <!-- Additional info -->
                <!--<transition name="slide" mode="out-in">-->
                    <div class="info" v-show="toggled" key="info">
                        <!-- Burden / SLEEP NEEDED (icon) -->
                        <div class="game row">
                            <div class="col col-2 tar colSub colTextBackground"></div>
                            <div class="col col-3 oddsblocks colBackground">
                                <div :class="[game.homeBurden, 'icon', 'icon-left', 'col', 'col-2', 'small-col-3']">
                                </div>
                                <div class="col-2 col small-col-0">
                                </div>
                                <div :class="[game.awayBurden, 'icon', 'icon-right', 'tar', 'col', 'col-2', 'small-col-3']">
                                </div>
                            </div>
                            <div class="col col-1"></div>
                        </div>
                        <!-- Burden / SLEEP NEEDED (text) -->
                        <div class="game row">
                            <div class="col col-2 tar colSub colTextBackground">Burden</div>
                            <div class="col col-3 oddsblocks colBackground">
                                <div class="col col-2 small-col-3">{{ getBurdenText(game.homeBurden) }}</div>
                                <div class="col-2 col small-col-0">
                                </div>
                                <div class="tar col col-2 small-col-3">
                                    {{ getBurdenText(game.awayBurden) }}
                                </div>
                            </div>
                            <div class="col col-1"></div>
                        </div>
                        <!-- Let's loop through additional info blocks -->
                        <div v-for="block in blocks" v-bind:key="block.name">
                            <div class="game row">
                                <div class="col col-2 tar colSub colTextBackground">{{ block.name }}</div>
                                <div class="col col-3 oddsblocks colBackground">
                                    <div class="oddssubblock basicHome" :style="{ width: block.home + '%' }" :title="block.home + ' %'">
                                        <span>{{ block.home }} %</span>
                                    </div>
                                    <div class="oddssubblock basicDraw tac" :style="{ width: block.draw + '%' }" :title="block.draw + ' %'">
                                        <span>{{ block.draw }} %</span>
                                    </div>
                                    <div class="oddssubblock basicAway tar" :style="{ width: block.away + '%' }" :title="block.away + ' %'">
                                        <span>{{ block.away }} %</span>
                                    </div>
                                </div>
                                <div class="col col-1"></div>
                            </div>
                        </div>
                        <!-- Additional info: Missing players -->
                        <div class="game row"  >
                            <div class="col col-2 tar colSub colTextBackground">Missing Players</div>
                            <div class="col col-3 oddsblocks colBackground">
                                <template v-if="game.containsMPP">
                                    <template v-if="game.containsLU">
                                        <div class="oddssubblockmpptxt tac">
                                            <span>{{ "Points based on actual lineup" }}</span>
                                        </div>
                                        <div class="oddssubblock basicHome" :style="{ width: game.block_13_lu_tot_home + '%' }">
                                            <span>{{ game.block_13_lu_tot_home }} %</span>
                                        </div>
                                        <div class="oddssubblock basicDraw tac" :style="{ width: game.block_13_lu_tot_draw + '%' }">
                                            <span>{{ game.block_13_lu_tot_draw }} %</span>
                                        </div>
                                        <div class="oddssubblock basicAway tar" :style="{ width: game.block_13_lu_tot_away + '%' }">
                                            <span>{{ game.block_13_lu_tot_away }} %</span>
                                        </div>
                                    </template>
                                <template v-else >
                                    <div class="oddssubblockmpptxt tac">
                                        <span>{{ "Points based on predicted missing players" }}</span>
                                    </div>
                                    <div class="oddssubblock basicHome" :style="{ width: game.block_13_mpp_tot_home + '%' }">
                                        <span>{{ game.block_13_mpp_tot_home }} %</span>
                                    </div>
                                    <div class="oddssubblock basicDraw tac" :style="{ width: game.block_13_mpp_tot_draw + '%' }">
                                        <span>{{ game.block_13_mpp_tot_draw }} %</span>
                                    </div>
                                    <div class="oddssubblock basicAway tar" :style="{ width: game.block_13_mpp_tot_away + '%' }">
                                        <span>{{ game.block_13_mpp_tot_away }} %</span>
                                    </div>
                                </template>
                             </template>
                            <template v-else >
                                <div class="oddssubblockempty basicAway tac">
                                    <span>{{ "N/A" }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="game row"  >
                        <div class="col col-2 tar colSub colTextBackground">Possible upset</div>
                        <div class="col col-3 oddsblocks colBackground">
                            <div v-if="game.fullSafeTag == 'NOT_SET'" class="oddssubblockempty basicAway tac">
                                <span>{{ "N/A" }}</span>
                            </div>
                            <div v-else class="tac basicAway">
                                <span>{{ fullSafeInfoText }}</span>
                            </div>
                        </div>
                        <div class="col col-1"></div>
                    </div>
                </div>
                </div>  
                
            </div>
        <!--</transition-group>-->
    </div>
</template>

<script>
export default {
    props: {
        game: {
            type: Object,
            required: true
        }, 
        upcoming: {
            type: Boolean,
            required: true
        },
        toggledDates: {
            type: Array,
            required: false
        }
    },
    data: function() {
        return {
            toggled: false,
            blocks: [
                { name: 'H/A Streak', home: this.game.block_1_str_ha_home, draw: this.game.block_1_str_ha_draw, away: this.game.block_1_str_ha_away},
                { name: 'H/A H2H', home: this.game.block_2_h2h_ha_home, draw: this.game.block_2_h2h_ha_draw, away: this.game.block_2_h2h_ha_away},
                { name: 'TOTAL Streak', home: this.game.block_3_str_tot_home, draw: this.game.block_3_str_tot_draw, away: this.game.block_3_str_tot_away},
                { name: 'TOTAL H2H', home: this.game.block_4_h2h_tot_home, draw: this.game.block_4_h2h_tot_draw, away: this.game.block_4_h2h_tot_away},
                { name: 'H/A Scoring', home: this.game.block_5_score_ha_home, draw: this.game.block_5_score_ha_draw, away: this.game.block_5_score_ha_away},
                { name: 'H/A Conceding', home: this.game.block_6_concede_ha_home, draw: this.game.block_6_concede_ha_draw, away: this.game.block_6_concede_ha_away},
                { name: 'TOTAL Scoring', home: this.game.block_7_score_tot_home, draw: this.game.block_7_score_tot_draw, away: this.game.block_7_score_tot_away},
                { name: 'TOTAL Conceding', home: this.game.block_8_concede_tot_home, draw: this.game.block_8_concede_tot_draw, away: this.game.block_8_concede_tot_away},
                { name: 'H/A Matches', home: this.game.block_9_matches_ha_home, draw: this.game.block_9_matches_ha_draw, away: this.game.block_9_matches_ha_away},
                { name: 'TOTAL Matches', home: this.game.block_10_matches_tot_home, draw: this.game.block_10_matches_tot_draw, away: this.game.block_10_matches_tot_away},
                { name: 'H/A Last Matches', home: this.game.block_11_last_matches_ha_home, draw: this.game.block_11_last_matches_ha_draw, away: this.game.block_11_last_matches_ha_away},
                { name: 'TOTAL Last Matches', home: this.game.block_12_last_matches_tot_home, draw: this.game.block_12_last_matches_tot_draw, away: this.game.block_12_last_matches_tot_away},

            ],
        }
    },
    computed: {
        checkDate() {
            if (!this.upcoming) {
                if ( this.$parent.$parent.activeDate != this.game.gameDate ) {
                    this.$emit('update-date', this.game.gameDate)
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
        checkToggled() {
            if (!this.upcoming) {
                if ( this.toggledDates.indexOf(this.game.gameDate ) > -1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        },
        dateToBeShown() {
            let tmp = new Date(this.game.gameDate);
            return tmp.toLocaleDateString();
        },
        fullSafeInfoText() {
            if(this.game.fullSafeTag == 'FULL_SAFE_STYLE_PAIR') {
                return 'Team styles are deemed unpredictable';
            } else if(this.game.fullSafeTag == 'INJURY_CHANGES_FAV') {
                return 'Team with bigger win propability is that only because of missing players';
            } 
            else if(this.game.fullSafeTag == 'INJURY_TOO_BIG') {
                return 'Team with bigger win propability has important players missing from lineup';
            } 
            else if(this.game.fullSafeTag == 'BURDEN_TOO_BIG') {
                return 'Team with bigger win propability has had tigh schedule and players migh be tired';
            } 
            else if(this.game.fullSafeTag == 'STYLE_BASED_H2H') {
                return 'Teams have played contrary to calculated propabilities against similarly styled opponents';
            } 
            else if(this.game.fullSafeTag == 'STREAK_TOO_LONG') {
                return 'Either one of the teams is on statistically too long winning/losing streak';
            } 
            else if(this.game.fullSafeTag == 'DRAW_TOO_CLOSE') {
                return 'Teams have played evenly against similarly styled opponents';
            } else {
                return '';
            }
        },
    },
    methods: {
        toggleInfo() {
            this.toggled = !this.toggled;
        },
        toggleGames() {
            this.$emit('toggle-date', this.game.gameDate);
        },
        getBurdenText(key) {
            if (key == 'NOT_NEEDED') {
                return 'Normal schedule'
            } else if ( key == 'NOT_SPECIFIC') {
                return 'Tight schedule + no tendency to not winning as often when tired'
            } else if ( key == 'SPECIFIC') {
                return 'Tight schedule + slight tendency to not winning as often when tired'
            } else {
                return 'Tight schedule + definite tendency to not winning as often when tired'
            }
        },
        decideBlockColour(block, blockValue, game) { 
            let odds = [game.homeOdds, game.drawOdds, game.awayOdds];
            let maxVal = Math.max.apply(Math, odds);
            let minVal = Math.min.apply(Math, odds);
            let retVal = '';
            if (this.upcoming){
                // Upcoming block colours
                if ( blockValue == maxVal ) {
                    if( odds.filter(x => x == maxVal).length === 1 ) {
                        retVal = 'highest'
                    } else {
                        // There are several blocks with max val
                        retVal = 'oneOfHighest'
                    }
                } 
            } else {
                if ( game.homeGoals > game.awayGoals ) {
                    // 1
                    if ( block === 'home') {
                        if (game.homeOdds === maxVal ) {
                            // Correct guess
                            if( odds.filter(x => x == maxVal).length === 1 ) {
                                retVal = 'correctGuess';
                            } else {
                                // There are several blocks with max val
                                retVal = 'oneOfCorrect'
                            }
                        } else if ( game.homeOdds === minVal ) {
                            retVal = 'incorrectGuess';
                        } else {
                            retVal = 'okGuess';
                        }
                    }
                    if ( block === 'draw') {
                        if (game.homeOdds === maxVal ) {
                            if (game.homeOdds === game.drawOdds ) {
                                // Home and Draw option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                    if ( block === 'away') {
                        if (game.homeOdds === maxVal ) {
                            if (game.homeOdds === game.awayOdds ) {
                                // Home and Away option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                } else if ( game.homeGoals === game.awayGoals ) {
                    // X
                    if ( block === 'draw') {
                        if (game.drawOdds === maxVal ) {
                            // Correct guess
                            if( odds.filter(x => x == maxVal).length === 1 ) {
                                retVal = 'correctGuess';
                            } else {
                                // There are several blocks with max val
                                retVal = 'oneOfCorrect'
                            }
                        } else if ( game.drawOdds === minVal ) {
                            retVal = 'incorrectGuess';
                        } else {
                            retVal = 'okGuess';
                        }
                    }
                    if ( block === 'home') {
                        if (game.drawOdds === maxVal ) {
                            if (game.drawOdds === game.homeOdds ) {
                                // Draw and Home option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                    if ( block === 'away') {
                        if (game.drawOdds === maxVal ) {
                            if (game.drawOdds === game.awayOdds ) {
                                // Draw and Away option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                } else {
                    // 2
                    if ( block === 'away') {
                        if (game.awayOdds === maxVal ) {
                            // Correct guess
                            if( odds.filter(x => x == maxVal).length === 1 ) {
                                retVal = 'correctGuess';
                            } else {
                                // There are several blocks with max val
                                retVal = 'oneOfCorrect'
                            }
                        } else if ( game.awayOdds === minVal ) {
                            retVal = 'incorrectGuess';
                        } else {
                            retVal = 'okGuess';
                        }
                    }
                    if ( block === 'draw') {
                        if (game.awayOdds === maxVal ) {
                            if (game.awayOdds === game.drawOdds ) {
                                // Away and Draw option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                    if ( block === 'away') {
                        if (game.awayOdds === maxVal ) {
                            if (game.awayOdds === game.homeOdds ) {
                                // Away and Home option both have biggest odds
                                retVal = 'oneOfCorrect'
                            }
                        }
                    }
                }
            }
            return retVal;
        }
    }
}
</script>

<style scoped>

</style>