import { cn } from '@/lib/utils';

import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function MarKdownRender({ children: markdown }: { children: string }) {
	return (
		<ReactMarkdown
			className="overflow-hidden text-sm leading-7"
			components={{
				pre: ({ ...props }) => (
					<div className="w-full mb-3">
						<pre {...props} />
					</div>
				),
				code: ({ className, children, ...props }) => {
					const match = /language-(\w+)/.exec(className || '');

					return match ? (
						<SyntaxHighlighter
							// @ts-expect-error something wrong here
							style={vs}
							customStyle={{
								backgroundColor: 'rgba(0 0 0 / .05)',
								padding: '16px',
							}}
							language={match[1]}
							{...props}
							className="shadow-md rounded-lg">
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code
							className={cn('px-2 py-1 bg-black/5 rounded-sm', className)}
							{...props}>
							{children}
						</code>
					);
				},
			}}>
			{markdown}
		</ReactMarkdown>
	);
}
