/**
 * 筛选策略
 */
const Strategy: {
    [index: string]: string
} = {
    /**
     * 全量
     */
    ALL: 'all',
    /**
     * 周线压着周30日线附近
     */
    // WEEK: 'week',
    MONTH: 'month',
    // Week: 'week',
    // lxy: 'lxy', //长下影线
};
export default Strategy;
