<template>
    <div
        v-if="!$types.isNull(data)"
        class="scoreboard-wrap"
        :style="wrapStyles"
    >
        <div class="scoreboard" :style="grid">
            <div class="hide-on-width"><div class="p-0-5"></div></div>
            <div class="hide-on-width"><div class="p-0-5"></div></div>
            <div class="hide-on-width"><div class="p-0-5"></div></div>
            <div
                v-for="(task, index) of data.main_data"
                :key="-index - 1"
                class="task-name-wrap hide-on-width"
                :class="data.main_data.length > threshold ? 'r' : 'bl'"
            >
                <div
                    class="ta-c task-name"
                    :class="data.main_data.length > threshold ? 'r' : 'p-0-5'"
                >
                    {{ task.task_name }}
                </div>
            </div>
            <div
                v-for="(teamTask, index) of teamTasks"
                :key="index"
                class="bt ta-c"
                :class="[
                    teamTask.type === 'index' ? '' : 'bl',
                    teamTask.text === '+' ? 'solved' : '',
                    teamTask.type === 'solved' ? 'hide-on-width' : '',
                ]"
            >
                <template v-if="teamTask.type === 'index'">
                    <div class="p-0-5">
                        {{ teamTask.index }}
                    </div>
                </template>
                <template v-if="teamTask.type === 'solved'">
                    <div class="p-0-5">
                        {{ teamTask.text }}
                    </div>
                </template>
                <template v-else-if="teamTask.type === 'teamName'">
                    <team
                        :id="teamTask.team.id"
                        :name="teamTask.team.name"
                        :rating="teamTask.team.rating"
                        class="p-0-5 team-name"
                    />
                </template>
                <template v-else-if="teamTask.type === 'teamScore'">
                    <div class="p-0-5 ">
                        {{ teamTask.score }}
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        page: String,
        pagesize: Number,
    },

    data: function() {
        return {
            threshold: 5,
        };
    },

    computed: {
        wrapStyles: function() {
            if (this.data.main_data.length <= this.threshold) {
                return {};
            }
            let sz = 0;
            let lst = 0;
            for (const [index, task] of this.data.main_data.entries()) {
                sz = Math.max(sz, task.task_name.length);
                lst = Math.max(
                    lst,
                    task.task_name.length -
                        3 * (this.data.main_data.length - index - 1)
                );
            }
            return {
                'padding-top': `${sz / 1.337 / Math.sqrt(2)}em`,
                'padding-right': `${lst / Math.sqrt(2)}em`,
                'font-size': '0.7em',
            };
        },

        solves: function() {
            let solves = {};
            for (const [index, task] of this.data.main_data.entries()) {
                for (let team of task.solved_participants) {
                    solves[[index, team]] = true;
                }
            }
            return solves;
        },

        teamTasks: function() {
            let result = [];
            for (const [
                index,
                team,
            ] of this.data.participants.results.entries()) {
                result.push({
                    type: 'index',
                    index:
                        1 +
                        index +
                        (this.$types.isUndefined(this.page)
                            ? 0
                            : parseInt(this.page, 10) - 1) *
                            this.pagesize,
                });
                result.push({
                    type: 'teamName',
                    team: {
                        id: team.id,
                        name: team.name,
                        rating: team.rating,
                    },
                });
                result.push({
                    type: 'teamScore',
                    score: team.cost_sum,
                });
                for (
                    let index = 0;
                    index < this.data.main_data.length;
                    index += 1
                ) {
                    result.push({
                        type: 'solved',
                        text: this.solves[[index, team.id]] === true ? '+' : '',
                    });
                }
            }
            return result;
        },

        grid: function() {
            if (this.data.main_data.length <= this.threshold) {
                return {
                    'grid-template-columns': `auto 1fr 1fr repeat(${this.data.main_data.length}, 1fr)`,
                };
            } else {
                return {
                    'grid-template-columns': `auto auto auto repeat(${this.data.main_data.length}, 1fr)`,
                };
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.scoreboard-wrap {
    overflow-x: scroll;
}

.scoreboard {
    display: grid;
    white-space: nowrap;

    @media only screen and (max-width: 991px) {
        grid-template-columns: auto 1fr auto !important;
        font-size: 1.5em;
    }
}

.hide-on-width {
    @media only screen and (max-width: 991px) {
        display: none;
    }
}

.bt {
    @include use-theme {
        border-top: 0.05em solid $gray;
    }

    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.bl {
    @include use-theme {
        border-left: 0.05em solid $gray;
    }
}

.solved {
    @include use-theme {
        background-color: $greenlight;
    }
}

.task-name-wrap.r {
    padding-left: 50%;
}

.task-name.r {
    width: 0;
    transform: translateY(-1em) rotate(-45deg);
    transform-origin: bottom left;
}

.team-name {
    display: inline-block;
}
</style>
