import React from 'react';

import Layout from 'layouts/sidebar/Container';
import withLayout from 'wrappers/withLayout';

import { Button } from 'reactstrap';
import CardWithTabs from 'components/CardWithTabs/Container';
import Pagination from 'components/Pagination/Container';
import { LinkContainerNonActive } from 'lib/LinkContainer';

const Component = props => (
    <CardWithTabs
        title="Tasks"
        pagination={
            <>
                {
                    props.tasks
                    && <Pagination to={'/tasks/'}
                        currentPage={props.currentPage}
                        count={props.count}
                        pageSize={props.pageSize} />
                }
            </>
        }
    >
        <div id="tasks-table">
            <div id="tasks-table-head">
                <span className="ta-c">#</span>
                <span className="ta-l">Name</span>
                <span className="ta-c">Cost</span>
                <span className="ta-c">Tags</span>
                <span className="ta-c">Solved</span>
            </div>
            <div id="tasks-table-body">
                {props.tasks && props.tasks.map((obj, i) => (
                    <div key={i} className="tasks-table-item">
                        <span className="ta-c">{i + 1 + props.pageSize * (props.currentPage - 1)}</span>
                        <span className="ta-l">
                            <LinkContainerNonActive to={`/tasks/${obj.id}/`}>
                                <a>
                                    {obj.name}
                                </a>
                            </LinkContainerNonActive>
                        </span>
                        <span className="ta-c">
                            {obj.cost}
                        </span>
                        <span className="ta-c">
                            <span>
                                {obj.task_tags_details.map((tag, j) => (
                                    <Button className="btn-sm mr-1 ml-1"
                                        outline color="secondary" key={j}>
                                        {tag.name}
                                    </Button>
                                ))}
                            </span>
                        </span>
                        <span className="ta-c">
                            <LinkContainerNonActive to={`/tasks/${obj.id}/solved/`}>
                                <a>
                                    {obj.solved_count}
                                </a>
                            </LinkContainerNonActive>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </CardWithTabs>
);

export default withLayout(Component, Layout);
