<template>
    <div v-if="!$types.isNull(task)">
        <div class="p-r" v-if="!$types.isNull(task) && task.can_edit_task">
            <div class="a-tr">
                <router-link
                    :to="{ name: 'task_edit', params: { id: task.id } }"
                    class="btn nlnk"
                >
                    Edit task
                </router-link>
            </div>
        </div>
        <h1 class="header">
            {{ task.name }}
        </h1>
        <div class="author mt-1">
            By
            <user
                :username="task.author_username"
                :rating="task.author_rating"
            />,
            <router-link :to="solved.link" class="link nlnk"
                >{{ solved.number }} solves</router-link
            >
        </div>
        <div class="hints mt-1" v-if="task.hints.length > 0">
            <hint
                :num="index + 1"
                :id="hint"
                v-for="(hint, index) of task.hints"
                :key="index"
            />
        </div>
        <div class="tags mt-1 mb-1">
            <span class="tags-h">Tags:</span>
            <tag
                v-for="tag of task.tags_details"
                :key="tag.id"
                :name="tag.name"
            />
        </div>
        <div class="hr"></div>
        <div class="content mt-1">
            <div class="markdown">
                <markdown :content="task.description"></markdown>
            </div>
        </div>
        <div class="hr mt-1"></div>
        <div class="files mt-1" v-if="task.files_details.length > 0">
            <div>Files:</div>
            <a
                :href="`${mediaUrl}/${file.file_field}`"
                target="_blank"
                v-for="file of task.files_details"
                :key="file.id"
            >
                {{ file.name }}
            </a>
        </div>
        <div class="hr mt-1" v-if="task.files_details.length > 0"></div>
        <form class="mt-2" @submit.prevent="submitFlag(flag)">
            <f-input
                type="text"
                name="flag"
                v-model="flag"
                :errors="errors['flag']"
                placeholder="Flag"
                :customClasses="[
                    task.is_solved_by_user ? 'solved' : '',
                    task.is_solved_on_upsolving && !task.is_solved_by_user
                        ? 'upsolved'
                        : '',
                ]"
            />
            <div class="ff">
                <f-detail :errors="errors['detail']" />
            </div>
            <div class="ff">
                <input type="submit" value="Submit" class="btn" />
            </div>
        </form>
    </div>
</template>

<script>
import Hint from '@/components/Hint/Index';
import Tag from '@/components/Tag/Index';
import { mediaUrl } from '@/config';
import Markdown from '@/components/Markdown/Index';
import FInput from '@/components/Form/Input';

export default {
    props: {
        task: Object,
        errors: Object,
        submitFlag: Function,
        solved: Object,
    },

    components: {
        Tag,
        Markdown,
        FInput,
        Hint,
    },

    data: function() {
        return {
            mediaUrl,
            flag: null,
        };
    },
};
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    .tags-h {
        margin-right: 0.5em;
    }
}

.content {
    @include use-theme {
        border-left: 0.3em solid $gray;
    }
}

.markdown {
    margin-left: 1em;
    padding: 1em;
}

.header {
    font-size: 2em;
}
</style>
