import { RemarkPluginRaw } from '@milkdown/transformer';
import { $remark } from '@milkdown/utils';
import { useMemo } from 'react';
import { visit, SKIP } from 'unist-util-visit';

type MentionPluginOptions = {
  getMentionUrl: (username: string) => string;
};

const regex = /(?:^|\s)@([\da-z][-\da-z_]{0,38})/gi;

const mentionPlugin: RemarkPluginRaw<MentionPluginOptions> = ({
  getMentionUrl,
}) => {
  return tree => {
    visit(tree, 'text', (node, _index, parent) => {
      if (!parent) {
        return [SKIP, _index];
      }
      if (_index === null || _index === undefined) {
        return [SKIP, _index];
      }

      let match;

      let textIndex = 0;
      const childrenToAdd = [];

      while ((match = regex.exec(node.value)) !== null) {
        const username = match[1];
        const mentionStartIndex = match.index;
        const mentionEndIndex = mentionStartIndex + match[0].length;

        console.log('node: ', node.value);

        // Add text before the mention
        if (mentionStartIndex > textIndex) {
          childrenToAdd.push({
            type: 'text',
            value: node.value.slice(textIndex, mentionStartIndex),
          });
        }

        // Add mention link
        childrenToAdd.push({
          type: 'link',
          url: `/${username}`,
          children: [{ type: 'text', value: `@${username}` }],
        });

        textIndex = mentionEndIndex;
      }

      // Add remaining text after the last mention
      if (textIndex < node.value.length) {
        childrenToAdd.push({
          type: 'text',
          value: node.value.slice(textIndex),
        });
      }

      // Replace the text node with the new children
      parent.children.splice(_index, 1, ...childrenToAdd);
    });
  };
};

const mentionRemarkPlugin = $remark('mentionsRemark', () => mentionPlugin);

export const useMentionsPlugin = () => {
  const mentionsPlugin = useMemo(() => [mentionRemarkPlugin].flat(), []);

  return mentionsPlugin;
};
