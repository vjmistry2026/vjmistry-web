export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;

    // Remove HTML tags if your content has any
    const text = content.replace(/<[^>]*>/g, "");

    const wordCount = text.trim().split(/\s+/).length;

    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return `${minutes} min${minutes > 1 ? "s" : ""} read`;
}