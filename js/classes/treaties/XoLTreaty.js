class XoLTreaty {
    constructor(attachment, limit) {
        this.attachment = attachment;
        this.limit = limit;
    }

    applyTreaty(loss) {
        const cappedLoss = Math.min(loss - this.attachment, this.limit);
        return Math.max(cappedLoss, 0);
    }
}

export default XoLTreaty;