module.exports = {
  wordList: {
    id123456781: 'BAD',
    id123456782: 'CAB',
    id123456783: 'CAD',
    id123456788: 'CAD',
    id123456784: 'DAB',
    id123456785: 'AB',
    id123456787: 'AD',
    id123456786: 'BA',
  },
  tree: {
    data: '',
    B: {
      data: 'B',
      A: {
        data: 'A',
        id: ['id123456786'],
        D: {
          data: 'D',
          id: ['id123456781'],
        },
      },
    },
    C: {
      data: 'C',
      A: {
        data: 'A',
        B: {
          data: 'B',
          id: ['id123456782'],
        },
        D: {
          data: 'D',
          id: ['id123456783', 'id123456788'],
        },
      },
    },
    D: {
      data: 'D',
      A: {
        data: 'A',
        B: {
          data: 'B',
          id: ['id123456784'],
        },
      },
    },
    A: {
      data: 'A',
      B: {
        data: 'B',
        id: ['id123456785'],
      },
      D: {
        data: 'D',
        id: ['id123456787'],
      },
    },
  },
};
