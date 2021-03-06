<template>
    <div
        :style="tableStyles"
        class="table"
        v-if="!$types.isNull(data) && data.length > 0"
    >
        <div
            v-for="(field, index) of fields"
            :key="field.name"
            class="table-head"
            :class="[
                index === 0 ? 'l' : '',
                index + 1 === fields.length ? 'r' : '',
                getPos(field.pos),
            ]"
        >
            <span>
                {{ field.name }}
            </span>
        </div>
        <div
            v-for="cell of cells"
            :key="cell.counter"
            class="table-cell vc"
            :class="
                [cell.right ? 'r' : '']
                    .concat(getClasses(cell.value))
                    .concat(getPos(cell.field.pos))
            "
        >
            <component
                :is="getComponent(cell.field)"
                :row="cell.value"
                :fieldData="getFieldData(cell.field)"
                v-if="$types.isUndefined(cell.field.aux)"
            />
            <component
                :is="getComponent(cell.field)"
                :row="cell.value"
                :fieldData="getFieldData(cell.field)"
                :aux="cell.field.aux"
                v-else
            />
        </div>
    </div>
    <div v-else-if="!$types.isNull(data) && data.length === 0">
        No records here
    </div>
</template>

<script>
import Text from './Text';

export default {
    props: {
        fields: Array,
        data: Array,
    },

    methods: {
        getComponent: function(field) {
            if (!this.$types.isUndefined(field.comp)) {
                return field.comp;
            } else {
                return Text;
            }
        },

        getFieldData: function(field) {
            if (!this.$types.isUndefined(field.key)) {
                return field.key;
            } else {
                return field.name.toLowerCase();
            }
        },

        getPos: function(pos) {
            return [
                `jc-${this.$types.isUndefined(pos) ? 'c' : pos}`,
                pos === 'l' ? 'pl-0-5' : '',
            ];
        },

        getClasses: function(obj) {
            if (this.$types.isUndefined(obj.customClasses)) {
                return [];
            }
            return obj.customClasses;
        },
    },

    computed: {
        cells: function() {
            let result = [];
            let counter = 0;
            for (const value of this.data) {
                for (const [index, field] of this.fields.entries()) {
                    result.push({
                        value,
                        field,
                        counter,
                        right: index + 1 === this.fields.length,
                    });
                    counter += 1;
                }
            }
            return result;
        },

        tableStyles: function() {
            let columns = '';
            for (const field of this.fields) {
                columns += `minmax(${field.nowrap ? 'auto' : '0'}, ${
                    field.grow
                }fr) `;
            }
            return {
                'grid-template-columns': columns,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.table {
    display: grid;
}

.table-head {
    @include use-theme {
        background-color: $gray;
    }

    padding: 0.8em;
    display: flex;

    &.l {
        border-top-left-radius: 0.5em;
    }

    &.r {
        border-top-right-radius: 0.5em;
    }
}

.table-cell {
    @include use-theme {
        border-bottom: 0.05em solid $gray;
        border-left: 0.05em solid $gray;
    }

    display: flex;

    & > :first-child {
        max-width: 100%;
    }

    &.r {
        @include use-theme {
            border-right: 0.05em solid $gray;
        }
    }

    padding-top: 0.8em;
    padding-bottom: 0.8em;
}
</style>
