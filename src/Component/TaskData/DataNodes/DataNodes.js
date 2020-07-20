import React, { useState, useEffect } from 'react';
import classes from './DataNodes.css';
import DataNode from './DataNode/DataNode';

const dataNodes = (props) => {
    const [nodeContent, setnodeContent] = useState(null);
    const list = (data) => {
        const children = (items) => {
            if (items) {
                return <div>{list(items)}</div>
            }
        }

        return Object.keys(data).map((n, index) => {
            return <DataNode selectedNode={data[n]}
                key={(data[n].taskId).replace()}

            >
                {children(data[n].node)
                }
            </DataNode>
        })
    }


    useEffect(() => {
        if (props.selectedNode.node)
            setnodeContent(
                <div>
                    {list(props.selectedNode.node)}
                </div>
            )
    }, [props.selectedNode])

    return (
        <div className={classes.DataNodes}>
            <DataNode
                selectedNode={props.selectedNode}
                parentNode={true}
            >
                {nodeContent}
            </DataNode>


        </div>
    );
}



export default dataNodes;