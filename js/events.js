// 扩展的事件库 - 由资深游戏制作人设计
const EventLibrary = {
    // 科普类事件库
    science: {
        positive: [
            {
                title: "科普视频爆火",
                description: "你的一条硬核科普视频突然走红，各大媒体争相转载！",
                options: [
                    {
                        text: "趁热打铁，继续深耕专业内容",
                        effects: { fans: 800, contentQuality: 8, personaFit: 5, rankProgress: 10 },
                        type: 'positive'
                    },
                    {
                        text: "保持节奏，稳扎稳打",
                        effects: { fans: 500, contentQuality: 12, personaFit: 8, rankProgress: 12 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "学术机构合作邀请",
                description: "知名大学邀请你参与科普项目，并提供资源支持！",
                options: [
                    {
                        text: "全力投入合作",
                        effects: { contentQuality: 15, personaFit: 10, profit: 2000, rankProgress: 15, savings: -800 },
                        type: 'positive'
                    },
                    {
                        text: "有选择地参与",
                        effects: { contentQuality: 10, personaFit: 6, profit: 1000, rankProgress: 10, savings: -300 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "科普奖项提名",
                description: "你被提名为年度最佳科普博主，业内认可度大增！",
                options: [
                    {
                        text: "积极宣传，扩大影响",
                        effects: { fans: 1000, personaFit: 12, rankProgress: 15 },
                        type: 'positive'
                    }
                ]
            }
        ],
        negative: [
            {
                title: "科普内容被质疑",
                description: "专业人士指出你的科普内容存在知识性错误，引发争议！",
                options: [
                    {
                        text: "虚心道歉，认真更正",
                        effects: { fans: -200, contentQuality: -5, mood: -10, rankProgress: -5 },
                        type: 'negative'
                    },
                    {
                        text: "删除内容，低调处理",
                        effects: { fans: -300, personaFit: -12, mood: -15, rankProgress: -8 },
                        type: 'negative'
                    },
                    {
                        text: "据理力争，坚持观点",
                        effects: { fans: -100, contentQuality: -8, personaFit: -10, mood: -5 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "同行恶意抄袭",
                description: "发现其他博主大量抄袭你的科普内容，还比你先火了！",
                options: [
                    {
                        text: "公开谴责维权",
                        effects: { fans: -50, mood: -15, energy: -10 },
                        type: 'negative'
                    },
                    {
                        text: "默默忍受，继续创作",
                        effects: { mood: -20, personaFit: -5 },
                        type: 'negative'
                    }
                ]
            }
        ],
        choice: [
            {
                title: "科普风格转型建议",
                description: "团队建议你从硬核科普转向趣味科普，更容易吸引年轻观众...",
                options: [
                    {
                        text: "坚持硬核路线",
                        effects: { contentQuality: 10, personaFit: 8, fans: -100, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "转型趣味科普",
                        effects: { fans: 600, mood: 5, contentQuality: -8, personaFit: -5, rankProgress: 3 },
                        type: 'mixed'
                    },
                    {
                        text: "两种风格并行",
                        effects: { fans: 300, contentQuality: -3, energy: -15, rankProgress: 2 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "商业化vs学术性",
                description: "有品牌愿意高价合作，但要求你在科普中植入产品...",
                options: [
                    {
                        text: "拒绝合作，保持纯粹",
                        effects: { personaFit: 10, contentQuality: 5, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "接受合作，软性植入",
                        effects: { profit: 3000, fans: 400, personaFit: -8, contentQuality: -5, rankProgress: -3 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "热点追逐诱惑",
                description: "最近某科学热点话题爆火，但你并不擅长这个领域...",
                options: [
                    {
                        text: "深入研究后再讲解",
                        effects: { contentQuality: 8, personaFit: 5, energy: -20, fans: 200 },
                        type: 'mixed'
                    },
                    {
                        text: "快速跟进热点",
                        effects: { fans: 800, profit: 500, contentQuality: -10, personaFit: -8, rankProgress: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "不追热点，保持节奏",
                        effects: { personaFit: 8, contentQuality: 5, fans: -50, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "回形针·纸夹联动邀请",
                description: "知名科普团队“回形针·纸夹”邀请你做一期联动科普，但要求你适度简化内容以照顾大众理解...",
                options: [
                    {
                        text: "接受联动，提升曝光",
                        effects: { fans: 900, contentQuality: -4, personaFit: -5, rankProgress: 6 },
                        type: 'mixed'
                    },
                    {
                        text: "坚持深度，婉拒联动",
                        effects: { contentQuality: 8, personaFit: 10, fans: -100, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "提出折中方案",
                        effects: { fans: 500, contentQuality: 2, personaFit: 4, energy: -10, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "何童学式实验演示",
                description: "你被建议做“何童学”式高质感实验演示视频，画面精致但制作成本高。",
                options: [
                    {
                        text: "投入制作，追求质感",
                        effects: { contentQuality: 12, personaFit: 8, fans: 400, savings: -800, energy: -15 },
                        type: 'mixed'
                    },
                    {
                        text: "简化制作，控制成本",
                        effects: { contentQuality: 6, fans: 300, profit: 200, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "暂缓计划，保持节奏",
                        effects: { personaFit: 6, mood: 5, rankProgress: 6 },
                        type: 'mixed'
                    }
                ]
            }
        ],
        edgeTemptation: [
            {
                title: "低俗玩梗科普诱惑",
                description: "MCN建议你用夸张表情、低俗段子包装科普，能快速涨粉破圈！数据显示这种内容播放量是正常科普的10倍...",
                options: [
                    {
                        text: "坚决拒绝，保持专业",
                        effects: { personaFit: 10, contentQuality: 8, rankProgress: 10 },
                        type: 'positive'
                    },
                    {
                        text: "适度玩梗，增加趣味",
                        effects: { fans: 1200, profit: 800, contentQuality: -5, personaFit: -3, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "全面迎合，博取流量",
                        effects: { fans: 2500, profit: 1500, contentQuality: -15, personaFit: -12, rankProgress: -10, mood: -10 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "标题党诱惑",
                description: "运营建议用震惊体标题：'99%的人不知道的恐怖真相！'这类标题能让点击率暴涨5倍！",
                options: [
                    {
                        text: "拒绝，使用专业标题",
                        effects: { personaFit: 8, contentQuality: 6, rankProgress: 8 },
                        type: 'positive'
                    },
                    {
                        text: "偶尔使用，吸引流量",
                        effects: { fans: 1000, profit: 600, personaFit: -6, contentQuality: -8, rankProgress: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "大量使用，快速破圈",
                        effects: { fans: 2000, profit: 1200, personaFit: -15, contentQuality: -12, rankProgress: -15, mood: -5 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "伪科学流量诱惑",
                description: "有团队建议你做'量子养生''水晶能量'等伪科学内容，保证流量暴涨，很多大V都在做...",
                options: [
                    {
                        text: "坚决抵制伪科学",
                        effects: { personaFit: 15, contentQuality: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "打擦边球，暧昧表达",
                        effects: { fans: 1500, profit: 2000, contentQuality: -20, personaFit: -18, rankProgress: -20, mood: -15 },
                        type: 'risky'
                    }
                ]
            }
        ]
    },

    // 吃播类事件库
    mukbang: {
        positive: [
            {
                title: "探店视频爆火",
                description: "你的美食探店视频获得百万播放，多家餐厅主动联系合作！",
                options: [
                    {
                        text: "精选优质餐厅合作",
                        effects: { fans: 800, profit: 2000, personaFit: 8, rankProgress: 10 },
                        type: 'positive'
                    },
                    {
                        text: "广泛合作，扩大影响",
                        effects: { fans: 1200, profit: 3000, personaFit: 3, rankProgress: 8 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "美食品牌代言",
                description: "知名食品品牌邀请你做代言人，报酬丰厚！",
                options: [
                    {
                        text: "接受代言",
                        effects: { profit: 5000, fans: 1000, personaFit: 10, rankProgress: 15 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "美食纪录片邀请",
                description: "电视台邀请你参与美食纪录片拍摄，提升专业度！",
                options: [
                    {
                        text: "参与拍摄",
                        effects: { fans: 1500, personaFit: 15, contentQuality: 10, rankProgress: 20, energy: -20, savings: -1200 },
                        type: 'positive'
                    }
                ]
            }
        ],
        negative: [
            {
                title: "食品安全事故",
                description: "你推荐的餐厅被曝出严重卫生问题，粉丝质疑你的判断力！",
                options: [
                    {
                        text: "公开道歉并补偿",
                        effects: { fans: -300, savings: -1000, mood: -15, rankProgress: -10 },
                        type: 'negative'
                    },
                    {
                        text: "撇清关系推卸责任",
                        effects: { fans: -800, personaFit: -20, mood: -20, rankProgress: -20 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "到月社探店风波",
                description: "同行“到月社”探店翻车引发舆论，网友开始对吃播探店内容进行集中质疑，连带影响到你。",
                options: [
                    {
                        text: "公开自查选店流程",
                        effects: { personaFit: 8, contentQuality: 5, fans: -150, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "保持沉默，减少探店",
                        effects: { fans: -300, savings: -800, mood: -10, rankProgress: -5 },
                        type: 'negative'
                    },
                    {
                        text: "加大探店频率，抢占流量",
                        effects: { fans: 600, profit: 1200, personaFit: -10, contentQuality: -8, rankProgress: -8 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "身体健康警告",
                description: "体检报告显示你的健康指标严重超标，医生建议停止高油高盐饮食...",
                options: [
                    {
                        text: "调整饮食，健康为重",
                        effects: { mood: 10, energy: 10, fans: -200, savings: -500 },
                        type: 'mixed'
                    },
                    {
                        text: "继续工作，暂时忽略",
                        effects: { mood: -20, energy: -15, fans: 300, profit: 800 },
                        type: 'negative'
                    }
                ]
            }
        ],
        choice: [
            {
                title: "高端vs平民路线",
                description: "团队建议你转型做高端餐厅，但你的粉丝大多喜欢平价美食...",
                options: [
                    {
                        text: "坚持平民路线",
                        effects: { fans: 500, personaFit: 10, profit: 500, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "转型高端路线",
                        effects: { profit: 2000, contentQuality: 8, fans: -300, personaFit: -5, rankProgress: 3 },
                        type: 'mixed'
                    },
                    {
                        text: "两种路线都做",
                        effects: { fans: 300, profit: 1200, energy: -20, personaFit: -3 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "小羊哥式整活吃播",
                description: "团队建议你学习“小羊哥”式整活与段子化吃播，互动率高但可能被说不够专业。",
                options: [
                    {
                        text: "适度整活，保持专业",
                        effects: { fans: 700, profit: 800, contentQuality: -4, personaFit: -5, rankProgress: 3 },
                        type: 'mixed'
                    },
                    {
                        text: "坚持纯吃播路线",
                        effects: { contentQuality: 8, personaFit: 6, fans: 200, rankProgress: 6 },
                        type: 'mixed'
                    },
                    {
                        text: "全面整活，追求热度",
                        effects: { fans: 1500, profit: 2000, contentQuality: -10, personaFit: -12, rankProgress: -8, mood: -5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "地方美食vs网红餐厅",
                description: "坚持挖掘地方小吃还是追逐网红餐厅？",
                options: [
                    {
                        text: "深耕地方美食",
                        effects: { contentQuality: 10, personaFit: 8, fans: 300, rankProgress: 10 },
                        type: 'mixed'
                    },
                    {
                        text: "追逐网红热点",
                        effects: { fans: 1000, profit: 1500, contentQuality: -5, personaFit: -8, rankProgress: -5 },
                        type: 'mixed'
                    }
                ]
            }
        ],
        edgeTemptation: [
            {
                title: "暴食挑战诱惑",
                description: "平台推'大胃王挑战'活动，完成挑战有10万奖金+流量扶持！但可能损害健康和形象...",
                options: [
                    {
                        text: "拒绝，健康第一",
                        effects: { mood: 10, personaFit: 10, rankProgress: 10 },
                        type: 'positive'
                    },
                    {
                        text: "适度参与，控制分寸",
                        effects: { fans: 800, profit: 3000, mood: -5, energy: -10, personaFit: -5, rankProgress: 2 },
                        type: 'mixed'
                    },
                    {
                        text: "全力以赴，冲击奖金",
                        effects: { fans: 2000, profit: 10000, mood: -25, energy: -30, personaFit: -15, contentQuality: -10, rankProgress: -15 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "低俗吃相博眼球",
                description: "数据显示夸张吃相、发出响声、满嘴食物说话等内容完播率极高！很多吃播都在这么做...",
                options: [
                    {
                        text: "保持优雅，拒绝低俗",
                        effects: { personaFit: 12, contentQuality: 8, rankProgress: 12 },
                        type: 'positive'
                    },
                    {
                        text: "偶尔夸张，增加效果",
                        effects: { fans: 1000, profit: 800, personaFit: -8, contentQuality: -6, rankProgress: -5 },
                        type: 'mixed'
                    },
                    {
                        text: "全程夸张，博取流量",
                        effects: { fans: 2500, profit: 1500, personaFit: -20, contentQuality: -15, rankProgress: -20, mood: -10 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "着装擦边诱惑",
                description: "有人建议你穿低胸装、紧身衣直播，能吸引大量男性观众打赏...",
                options: [
                    {
                        text: "坚持得体着装",
                        effects: { personaFit: 15, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "稍微性感，吸引眼球",
                        effects: { fans: 1200, profit: 2000, personaFit: -12, contentQuality: -8, rankProgress: -10 },
                        type: 'mixed'
                    },
                    {
                        text: "大胆着装，收益为主",
                        effects: { fans: 2000, profit: 5000, personaFit: -25, contentQuality: -15, rankProgress: -25, mood: -15 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "虚假宣传诱惑",
                description: "商家给高额回扣，要求你夸大宣传'祖传秘方''百年老店'，很多博主都这么干...",
                options: [
                    {
                        text: "拒绝虚假宣传",
                        effects: { personaFit: 12, contentQuality: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "委婉包装，适度美化",
                        effects: { profit: 2000, fans: 500, personaFit: -8, contentQuality: -6, rankProgress: -8 },
                        type: 'mixed'
                    },
                    {
                        text: "夸大宣传，收钱办事",
                        effects: { profit: 5000, fans: 800, personaFit: -20, contentQuality: -15, rankProgress: -20, mood: -10 },
                        type: 'risky'
                    }
                ]
            }
        ]
    },

    // 美妆类事件库
    beauty: {
        positive: [
            {
                title: "妆容教程爆红",
                description: "你的化妆教程获得千万播放，美妆品牌纷纷关注你！",
                options: [
                    {
                        text: "继续精进技术",
                        effects: { fans: 1000, contentQuality: 12, personaFit: 10, rankProgress: 15 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "品牌代言邀约",
                description: "国际一线美妆品牌邀请你做亚太区代言人！",
                options: [
                    {
                        text: "接受代言",
                        effects: { profit: 8000, fans: 2000, personaFit: 15, rankProgress: 20 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "时尚杂志专访",
                description: "知名时尚杂志邀请你做封面人物并专访！",
                options: [
                    {
                        text: "接受专访",
                        effects: { fans: 1500, personaFit: 12, contentQuality: 8, rankProgress: 15, savings: -800 },
                        type: 'positive'
                    }
                ]
            }
        ],
        negative: [
            {
                title: "产品过敏事件",
                description: "多位粉丝使用你推荐的产品后严重过敏，要求你赔偿！",
                options: [
                    {
                        text: "积极赔偿，下架产品",
                        effects: { fans: -200, savings: -2000, mood: -15, rankProgress: -8 },
                        type: 'negative'
                    },
                    {
                        text: "推诿责任，拒绝赔偿",
                        effects: { fans: -1000, personaFit: -25, mood: -20, rankProgress: -20 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "假货风波",
                description: "你在直播间售卖的产品被质疑是假货，舆论发酵！",
                options: [
                    {
                        text: "主动送检，证明清白",
                        effects: { fans: -100, savings: -1000, mood: -10, energy: -15 },
                        type: 'negative'
                    },
                    {
                        text: "删除视频，不予回应",
                        effects: { fans: -500, personaFit: -20, rankProgress: -15 },
                        type: 'negative'
                    }
                ]
            }
        ],
        choice: [
            {
                title: "平价vs高端定位",
                description: "团队建议你转型做高端美妆，但你的粉丝群体购买力有限...",
                options: [
                    {
                        text: "坚持平价路线",
                        effects: { fans: 600, personaFit: 10, profit: 1000, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "转型高端定位",
                        effects: { profit: 3000, contentQuality: 10, fans: -400, personaFit: -5, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "技术流vs颜值流",
                description: "是专注化妆技术教学，还是依靠颜值吸粉？",
                options: [
                    {
                        text: "主打技术教学",
                        effects: { contentQuality: 12, personaFit: 10, fans: 400, rankProgress: 12 },
                        type: 'mixed'
                    },
                    {
                        text: "主打颜值展示",
                        effects: { fans: 1200, profit: 1500, contentQuality: -8, personaFit: -6, rankProgress: -5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "张大E式带货节奏",
                description: "运营建议你学习“张大E”式强节奏带货和情绪拉满话术，转化率高但可能引发反感。",
                options: [
                    {
                        text: "小幅提升节奏",
                        effects: { profit: 1800, fans: 500, personaFit: -4, mood: -4, rankProgress: 4 },
                        type: 'mixed'
                    },
                    {
                        text: "保持温和专业风格",
                        effects: { personaFit: 10, contentQuality: 6, profit: 600, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "强势输出，追求转化",
                        effects: { profit: 4000, fans: 900, personaFit: -12, mood: -8, rankProgress: -6 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "李加琪式直播节奏",
                description: "运营建议你学习“李加琪”的超快节奏带货话术，提升转化，但可能被吐槽太强势...",
                options: [
                    {
                        text: "适度加快节奏",
                        effects: { profit: 2500, fans: 600, personaFit: -5, mood: -5, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "保持温柔讲解风格",
                        effects: { personaFit: 10, contentQuality: 6, profit: 500, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "全面复制高压话术",
                        effects: { profit: 5000, fans: 1200, personaFit: -15, mood: -10, rankProgress: -8 },
                        type: 'mixed'
                    }
                ]
            }
        ],
        edgeTemptation: [
            {
                title: "低俗妆容诱惑",
                description: "'纯欲妆''欲擒故纵妆'等擦边妆容播放量超高！运营建议你做这类内容...",
                options: [
                    {
                        text: "拒绝，保持专业",
                        effects: { personaFit: 15, contentQuality: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "适度尝试，跟随潮流",
                        effects: { fans: 1500, profit: 1200, personaFit: -10, contentQuality: -8, rankProgress: -8 },
                        type: 'mixed'
                    },
                    {
                        text: "大量产出，追求流量",
                        effects: { fans: 3000, profit: 2500, personaFit: -25, contentQuality: -20, rankProgress: -25, mood: -15 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "着装擦边诱惑",
                description: "数据显示穿着暴露、凸显身材的视频互动率高3倍！要不要试试？",
                options: [
                    {
                        text: "得体着装，专业形象",
                        effects: { personaFit: 12, rankProgress: 12 },
                        type: 'positive'
                    },
                    {
                        text: "稍微性感，展现魅力",
                        effects: { fans: 1500, profit: 1800, personaFit: -12, rankProgress: -10 },
                        type: 'mixed'
                    },
                    {
                        text: "大胆着装，博取眼球",
                        effects: { fans: 3000, profit: 3000, personaFit: -30, contentQuality: -15, rankProgress: -30, mood: -20 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "虚假功效宣传",
                description: "品牌方给高额回扣，要求你宣传'三天美白''一周祛斑'等夸大功效...",
                options: [
                    {
                        text: "拒绝虚假宣传",
                        effects: { personaFit: 15, contentQuality: 12, rankProgress: 18 },
                        type: 'positive'
                    },
                    {
                        text: "委婉表述，打擦边球",
                        effects: { profit: 3000, fans: 800, personaFit: -10, contentQuality: -8, rankProgress: -12 },
                        type: 'mixed'
                    },
                    {
                        text: "夸大宣传，收钱办事",
                        effects: { profit: 8000, fans: 1200, personaFit: -25, contentQuality: -20, rankProgress: -25, mood: -15 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "容貌焦虑营销",
                description: "运营建议你强调'不化妆就丑''素颜见不得人'等话术，能刺激粉丝消费...",
                options: [
                    {
                        text: "拒绝，传递正能量",
                        effects: { personaFit: 15, mood: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "适度使用对比效果",
                        effects: { fans: 1000, profit: 2000, personaFit: -8, mood: -5, rankProgress: -8 },
                        type: 'mixed'
                    },
                    {
                        text: "大量渲染容貌焦虑",
                        effects: { fans: 2000, profit: 5000, personaFit: -25, mood: -20, rankProgress: -25 },
                        type: 'risky'
                    }
                ]
            }
        ]
    },

    // 生活类事件库
    lifestyle: {
        positive: [
            {
                title: "日常vlog爆火",
                description: "你的生活记录引发广泛共鸣，粉丝称赞你真实接地气！",
                options: [
                    {
                        text: "保持真实，继续分享",
                        effects: { fans: 1000, personaFit: 12, mood: 10, rankProgress: 12 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "品牌生活方式合作",
                description: "知名生活品牌邀请你做生活方式大使！",
                options: [
                    {
                        text: "接受合作",
                        effects: { profit: 5000, fans: 1200, personaFit: 10, rankProgress: 15, savings: -600 },
                        type: 'positive'
                    }
                ]
            },
            {
                title: "粉丝暖心互动",
                description: "粉丝自发组织应援活动，让你深受感动！",
                options: [
                    {
                        text: "感谢粉丝，用心回馈",
                        effects: { fans: 800, mood: 20, personaFit: 10, rankProgress: 10 },
                        type: 'positive'
                    }
                ]
            }
        ],
        negative: [
            {
                title: "隐私泄露危机",
                description: "不小心在视频中暴露了家庭住址，引来大量私生饭骚扰！",
                options: [
                    {
                        text: "报警处理，搬家避险",
                        effects: { fans: -100, savings: -3000, mood: -20, energy: -20 },
                        type: 'negative'
                    },
                    {
                        text: "公开呼吁，希望理解",
                        effects: { fans: -50, mood: -15, energy: -10 },
                        type: 'negative'
                    }
                ]
            },
            {
                title: "家庭矛盾曝光",
                description: "家人不满你拍摄日常，在镜头前大吵一架被传播...",
                options: [
                    {
                        text: "公开道歉，停止拍摄",
                        effects: { fans: -300, mood: -25, personaFit: -10, rankProgress: -10 },
                        type: 'negative'
                    },
                    {
                        text: "删除视频，不予回应",
                        effects: { fans: -150, mood: -15, personaFit: -5 },
                        type: 'negative'
                    }
                ]
            }
        ],
        choice: [
            {
                title: "精致vs真实",
                description: "是展现精致生活吸引羡慕，还是真实生活引发共鸣？",
                options: [
                    {
                        text: "保持真实接地气",
                        effects: { fans: 600, personaFit: 12, contentQuality: 8, rankProgress: 10 },
                        type: 'mixed'
                    },
                    {
                        text: "展现精致生活",
                        effects: { fans: 1200, profit: 2000, personaFit: -5, contentQuality: 5, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "隐私边界把控",
                description: "分享越多越真实，但隐私风险也越大...",
                options: [
                    {
                        text: "保护隐私，适度分享",
                        effects: { mood: 10, energy: 5, fans: -100, personaFit: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "全面分享，拉近距离",
                        effects: { fans: 800, personaFit: 10, mood: -10, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "李子七式慢生活",
                description: "你被建议尝试“李子七”式的高质感慢生活内容，制作周期长、成本高，但口碑极好。",
                options: [
                    {
                        text: "投入制作，追求高品质",
                        effects: { contentQuality: 12, personaFit: 10, fans: 500, energy: -20, savings: -500 },
                        type: 'mixed'
                    },
                    {
                        text: "保持现有节奏",
                        effects: { fans: 200, personaFit: 5, rankProgress: 5 },
                        type: 'mixed'
                    },
                    {
                        text: "尝试简化版慢生活",
                        effects: { contentQuality: 6, fans: 350, energy: -10, profit: 200 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "风产姐妹式剧情化",
                description: "团队建议学习“风产姐妹”的剧情化生活短片，热度高但更依赖演绎和脚本。",
                options: [
                    {
                        text: "尝试剧情短片",
                        effects: { fans: 900, profit: 1200, contentQuality: -5, personaFit: -6, energy: -15 },
                        type: 'mixed'
                    },
                    {
                        text: "保持真实记录风格",
                        effects: { personaFit: 10, contentQuality: 6, fans: 200, rankProgress: 6 },
                        type: 'mixed'
                    }
                ]
            },
            {
                title: "张同学式一镜到底",
                description: "你被建议尝试“张同学”式一镜到底生活记录，沉浸感强但拍摄压力大。",
                options: [
                    {
                        text: "尝试一镜到底",
                        effects: { contentQuality: 10, fans: 600, energy: -15, rankProgress: 8 },
                        type: 'mixed'
                    },
                    {
                        text: "保持多机位剪辑",
                        effects: { contentQuality: 5, fans: 300, rankProgress: 5 },
                        type: 'mixed'
                    }
                ]
            }
        ],
        edgeTemptation: [
            {
                title: "低俗日常片段诱惑",
                description: "团队建议拍摄'晨起慵懒''沐浴更衣'等擦边日常，播放量保证翻倍！",
                options: [
                    {
                        text: "拒绝，保持健康内容",
                        effects: { personaFit: 15, contentQuality: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "偶尔尝试，增加看点",
                        effects: { fans: 1500, profit: 1500, personaFit: -12, contentQuality: -10, rankProgress: -12 },
                        type: 'mixed'
                    },
                    {
                        text: "经常拍摄，博取流量",
                        effects: { fans: 3000, profit: 3000, personaFit: -30, contentQuality: -25, rankProgress: -30, mood: -20 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "情感擦边营销",
                description: "运营建议你暗示单身、暧昧互动、营造'男友视角'，能吸引大量异性粉丝打赏...",
                options: [
                    {
                        text: "拒绝，真实展现",
                        effects: { personaFit: 12, rankProgress: 12 },
                        type: 'positive'
                    },
                    {
                        text: "适度营造氛围",
                        effects: { fans: 1200, profit: 2500, personaFit: -10, rankProgress: -10 },
                        type: 'mixed'
                    },
                    {
                        text: "全面情感营销",
                        effects: { fans: 2500, profit: 5000, personaFit: -25, mood: -15, rankProgress: -25 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "虚假人设包装",
                description: "团队建议你打造'富二代''名校学霸'等虚假人设，能快速圈粉...",
                options: [
                    {
                        text: "拒绝，做真实的自己",
                        effects: { personaFit: 15, mood: 10, rankProgress: 15 },
                        type: 'positive'
                    },
                    {
                        text: "适度美化包装",
                        effects: { fans: 1000, profit: 1500, personaFit: -8, rankProgress: -8 },
                        type: 'mixed'
                    },
                    {
                        text: "完全虚假人设",
                        effects: { fans: 2000, profit: 3000, personaFit: -25, mood: -20, rankProgress: -25 },
                        type: 'risky'
                    }
                ]
            },
            {
                title: "过度植入广告",
                description: "很多品牌愿意给钱，但粉丝抱怨广告太多影响观感...",
                options: [
                    {
                        text: "控制广告，优选品牌",
                        effects: { personaFit: 10, contentQuality: 5, profit: 2000, rankProgress: 10 },
                        type: 'mixed'
                    },
                    {
                        text: "大量接广告赚快钱",
                        effects: { profit: 8000, fans: -500, personaFit: -20, contentQuality: -15, rankProgress: -20, mood: -10 },
                        type: 'risky'
                    }
                ]
            }
        ]
    }
};

// 擦边试探事件（主动触发）
const EdgeActionEvents = [
    {
        title: "擦边试探：轻度",
        description: "选择相对保守的擦边方式，获取部分流量，但仍有口碑损耗。",
        options: [
            {
                text: "轻度擦边尝试",
                effects: { edgeFans: 800, edgeProfit: 400, personaFit: -5, contentQuality: -4, mood: -3, energy: -10 },
                type: 'mixed'
            },
            {
                text: "保持克制，适度表现",
                effects: { edgeFans: 600, edgeProfit: 200, personaFit: -3, contentQuality: -2, mood: -2, energy: -8 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "擦边试探：话术",
        description: "选择更具暗示性的表达方式，涨粉更快但人设受损明显。",
        options: [
            {
                text: "暧昧话术试探",
                effects: { edgeFans: 1400, edgeProfit: 600, personaFit: -8, contentQuality: -6, mood: -5, energy: -12 },
                type: 'mixed'
            },
            {
                text: "强势话术收割流量",
                effects: { edgeFans: 2000, edgeProfit: 900, personaFit: -15, contentQuality: -10, mood: -8, energy: -18 },
                type: 'risky'
            }
        ]
    },
    {
        title: "擦边试探：造型",
        description: "利用造型或镜头语言吸引注意力，收益更高但口碑风险更大。",
        options: [
            {
                text: "小幅造型优化",
                effects: { edgeFans: 1100, edgeProfit: 500, personaFit: -7, contentQuality: -6, mood: -4, energy: -12 },
                type: 'mixed'
            },
            {
                text: "重度造型突破",
                effects: { edgeFans: 2300, edgeProfit: 1200, personaFit: -18, contentQuality: -12, mood: -10, energy: -20 },
                type: 'risky'
            }
        ]
    }
];

// 存款提升事件（与属性绑定）
const SavingsEvents = [
    {
        title: "高颜值时尚拍摄邀约",
        description: "时尚品牌看中你的形象，邀请你参与广告拍摄。",
        requirements: { },
        options: [
            {
                text: "接受邀约（需颜值达标）",
                requirements: { minAttributes: { appearance: 7 } },
                effects: { profit: 3000, personaFit: 3, savings: 0 },
                type: 'positive'
            },
            {
                text: "婉拒邀约",
                effects: { personaFit: 2 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "知识付费课程合作",
        description: "平台邀请你开发课程，按销量分成。",
        options: [
            {
                text: "开设课程（需学历达标）",
                requirements: { minAttributes: { education: 7 } },
                effects: { profit: 3500, contentQuality: 4 },
                type: 'positive'
            },
            {
                text: "保持内容输出",
                effects: { contentQuality: 2 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "直播间高转化话术",
        description: "你在直播中用幽默话术带动成交。",
        options: [
            {
                text: "加大直播频次（需幽默达标）",
                requirements: { minAttributes: { humor: 7 } },
                effects: { profit: 2500, mood: -5, energy: -10 },
                type: 'mixed'
            },
            {
                text: "保持正常节奏",
                effects: { profit: 800 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "高质感拍摄报价提升",
        description: "镜头感提升后，你的报价显著上涨。",
        options: [
            {
                text: "提高报价（需镜头感达标）",
                requirements: { minAttributes: { cameraSense: 7 } },
                effects: { profit: 2800, personaFit: 2 },
                type: 'positive'
            },
            {
                text: "维持原价",
                effects: { profit: 1200 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "气质型品牌合作",
        description: "某高端品牌看中你的气质与人设，提出合作。",
        options: [
            {
                text: "接受合作（需气质达标）",
                requirements: { minAttributes: { temperament: 7 } },
                effects: { profit: 3200, personaFit: 4 },
                type: 'positive'
            },
            {
                text: "考虑后再说",
                effects: { personaFit: 1 },
                type: 'mixed'
            }
        ]
    }
];

// 类别专属存款事件池
const SavingsEventsByCategory = {
    science: [
        {
            title: "高校科普项目顾问",
            description: "高校科普中心邀请你担任项目顾问，提供咨询报酬。",
            options: [
                {
                    text: "参与顾问（需学历达标）",
                    requirements: { minAttributes: { education: 7 } },
                    effects: { profit: 4000, contentQuality: 6, personaFit: 4 },
                    type: 'positive'
                },
                {
                    text: "推荐同行合作",
                    effects: { personaFit: 3 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "企业科技讲座邀约",
            description: "企业希望你进行线上科普讲座，按场次支付报酬。",
            options: [
                {
                    text: "高质量讲座（需镜头感达标）",
                    requirements: { minAttributes: { cameraSense: 6 } },
                    effects: { profit: 3000, energy: -10, contentQuality: 4 },
                    type: 'positive'
                },
                {
                    text: "小规模试讲",
                    effects: { profit: 1200, energy: -6 },
                    type: 'mixed'
                }
            ]
        }
    ],
    mukbang: [
        {
            title: "连锁餐厅探店合作",
            description: "连锁餐厅邀请你探店并拍摄推广短片。",
            options: [
                {
                    text: "深度探店（需幽默达标）",
                    requirements: { minAttributes: { humor: 7 } },
                    effects: { profit: 3500, fans: 800, energy: -12 },
                    type: 'positive'
                },
                {
                    text: "轻量探店",
                    effects: { profit: 1500, fans: 300, energy: -6 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "美食节官方合作",
            description: "城市美食节邀请你做官方推荐官。",
            options: [
                {
                    text: "出席主会场（需镜头感达标）",
                    requirements: { minAttributes: { cameraSense: 6 } },
                    effects: { profit: 2800, personaFit: 4, mood: 5 },
                    type: 'positive'
                },
                {
                    text: "线上推荐",
                    effects: { profit: 1200, mood: 2 },
                    type: 'mixed'
                }
            ]
        }
    ],
    beauty: [
        {
            title: "彩妆联名企划",
            description: "彩妆品牌希望与你做联名色号合作。",
            options: [
                {
                    text: "联名合作（需颜值达标）",
                    requirements: { minAttributes: { appearance: 7 } },
                    effects: { profit: 4500, fans: 1000, personaFit: 6 },
                    type: 'positive'
                },
                {
                    text: "普通合作推广",
                    effects: { profit: 1800, fans: 300 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "成分解析专栏邀约",
            description: "平台邀请你撰写成分解析专栏。",
            options: [
                {
                    text: "深度解析（需学历达标）",
                    requirements: { minAttributes: { education: 7 } },
                    effects: { profit: 3200, contentQuality: 6 },
                    type: 'positive'
                },
                {
                    text: "简版解析",
                    effects: { profit: 1400, contentQuality: 2 },
                    type: 'mixed'
                }
            ]
        }
    ],
    lifestyle: [
        {
            title: "家居品牌软装合作",
            description: "家居品牌邀请你做软装搭配与生活方式推广。",
            options: [
                {
                    text: "全案软装（需气质达标）",
                    requirements: { minAttributes: { temperament: 7 } },
                    effects: { profit: 3600, personaFit: 6, contentQuality: 4 },
                    type: 'positive'
                },
                {
                    text: "局部搭配分享",
                    effects: { profit: 1500, personaFit: 2 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "城市文旅推广",
            description: "文旅局邀请你参与城市生活方式推广。",
            options: [
                {
                    text: "线下深度体验（需镜头感达标）",
                    requirements: { minAttributes: { cameraSense: 6 } },
                    effects: { profit: 3000, fans: 700, energy: -10 },
                    type: 'positive'
                },
                {
                    text: "线上种草",
                    effects: { profit: 1200, fans: 200 },
                    type: 'mixed'
                }
            ]
        }
    ]
};

// 基础团队分工与管理事件（中级达人开始出现）
const TeamBaseEvents = [
    {
        title: "分工雏形建立",
        description: "工作量激增，你需要把剪辑、运营、选题分工明确。",
        requirements: { minRank: "中级达人" },
        options: [
            {
                text: "明确分工",
                effects: { savings: -1200, contentQuality: 5, personaFit: 3 },
                type: 'mixed'
            },
            {
                text: "先靠临时协作",
                effects: { mood: -4, contentQuality: -2 },
                type: 'negative'
            }
        ]
    },
    {
        title: "团队扩张计划",
        description: "随着曝光度上涨，你需要组建更专业的内容团队。",
        requirements: { minRank: "高级达人" },
        options: [
            {
                text: "招募剪辑与运营",
                effects: { savings: -2000, contentQuality: 6, personaFit: 4, energy: -5 },
                type: 'mixed'
            },
            {
                text: "继续单打独斗",
                effects: { mood: -4, contentQuality: -3 },
                type: 'negative'
            }
        ]
    },
    {
        title: "团队管理摩擦",
        description: "团队规模扩大后，协作和流程问题开始出现。",
        requirements: { minRank: "高级达人" },
        options: [
            {
                text: "建立流程与分工",
                effects: { savings: -1500, personaFit: 4, contentQuality: 4, mood: -4 },
                type: 'mixed'
            },
            {
                text: "放任调整",
                effects: { contentQuality: -4, fans: -300, mood: -6 },
                type: 'negative'
            }
        ]
    },
    {
        title: "管理层级搭建",
        description: "业务扩张后，开始考虑组建管理层级。",
        requirements: { minRank: "头部达人" },
        options: [
            {
                text: "设立组长/负责人",
                effects: { savings: -2500, contentQuality: 5, personaFit: 5, mood: -3 },
                type: 'mixed'
            },
            {
                text: "继续扁平管理",
                effects: { mood: -5, contentQuality: -3 },
                type: 'negative'
            }
        ]
    }
];

// 矩阵扩张与孵化事件（高职级更常见）
const TeamMatrixEvents = [
    {
        title: "内容矩阵搭建",
        description: "平台鼓励头部创作者搭建子账号矩阵扩大影响。",
        requirements: { minRank: "头部达人" },
        options: [
            {
                text: "搭建矩阵账号",
                effects: { savings: -5000, fans: 2000, profit: 2000, energy: -12 },
                type: 'positive'
            },
            {
                text: "谨慎试水",
                effects: { savings: -2000, fans: 800, profit: 800, energy: -6 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "签约新人孵化",
        description: "你有机会签约新人，打造自己的小型MCN矩阵。",
        requirements: { minRank: "MCN签约" },
        options: [
            {
                text: "签约并孵化新人",
                effects: { savings: -8000, profit: 5000, fans: 3000, personaFit: 6 },
                type: 'positive'
            },
            {
                text: "稳住现金流",
                effects: { profit: 1500, mood: 2 },
                type: 'mixed'
            }
        ]
    }
];

// 不同职级挑战事件（塑造成长阶段的压力与抉择）
const RankChallengeEvents = [
    {
        title: "冷启动难题",
        description: "内容曝光有限，你需要找到更容易破圈的切入口。",
        requirements: { maxRank: "素人" },
        options: [
            {
                text: "打磨选题，保持节奏",
                effects: { contentQuality: 4, mood: -3 },
                type: 'mixed'
            },
            {
                text: "尝试小范围投流",
                effects: { fans: 200, savings: -500, personaFit: -2 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "首次商务压力",
        description: "品牌要求你给出明确的转化数据，小失误会影响口碑。",
        requirements: { minRank: "初级达人", maxRank: "初级达人" },
        options: [
            {
                text: "精细化执行",
                effects: { profit: 1200, contentQuality: 4, energy: -10 },
                type: 'mixed'
            },
            {
                text: "保守执行",
                effects: { profit: 600, personaFit: 3 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "数据焦虑期",
        description: "增长开始放缓，粉丝对内容审美提高。",
        requirements: { minRank: "中级达人", maxRank: "中级达人" },
        options: [
            {
                text: "升级内容策略",
                effects: { contentQuality: 6, savings: -1200 },
                type: 'mixed'
            },
            {
                text: "加快更新频率",
                effects: { fans: 500, energy: -12, mood: -4 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "商业化与口碑平衡",
        description: "合作邀约变多，但过度商业化会引发反感。",
        requirements: { minRank: "高级达人", maxRank: "高级达人" },
        options: [
            {
                text: "精选合作",
                effects: { profit: 2500, personaFit: 6, fans: -200 },
                type: 'mixed'
            },
            {
                text: "扩大合作规模",
                effects: { profit: 3500, personaFit: -6, fans: 300 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "舆论风险上升",
        description: "头部曝光带来更多审视与放大效应。",
        requirements: { minRank: "头部达人", maxRank: "头部达人" },
        options: [
            {
                text: "加强公关与合规",
                effects: { personaFit: 8, savings: -2000, contentQuality: 3 },
                type: 'mixed'
            },
            {
                text: "继续强势输出",
                effects: { fans: 800, personaFit: -6, mood: -4 },
                type: 'mixed'
            }
        ]
    },
    {
        title: "组织化管理挑战",
        description: "你已经像小型公司，需要稳定的流程与激励体系。",
        requirements: { minRank: "MCN签约" },
        options: [
            {
                text: "搭建激励与考核",
                effects: { savings: -4000, contentQuality: 6, personaFit: 6 },
                type: 'mixed'
            },
            {
                text: "暂缓制度建设",
                effects: { mood: -5, contentQuality: -4, fans: -200 },
                type: 'negative'
            }
        ]
    }
];

// 类别叠加挑战事件（按类别触发）
const CategoryChallengeEventsByCategory = {
    science: [
        {
            title: "专业质疑风波",
            description: "一段科普内容被指出表述不严谨，同行开始质疑你的专业性。",
            requirements: { minRank: "初级达人" },
            options: [
                {
                    text: "补充资料并修正",
                    effects: { contentQuality: 6, personaFit: 6, savings: -800 },
                    type: 'mixed'
                },
                {
                    text: "保持沉默",
                    effects: { personaFit: -6, fans: -200 },
                    type: 'negative'
                }
            ]
        },
        {
            title: "知识深度门槛",
            description: "粉丝希望看到更深入的内容，但制作成本显著上升。",
            requirements: { minRank: "中级达人" },
            options: [
                {
                    text: "投入研究与制作",
                    effects: { contentQuality: 8, savings: -1500, energy: -10 },
                    type: 'mixed'
                },
                {
                    text: "保持轻量输出",
                    effects: { fans: -150, mood: -3 },
                    type: 'negative'
                }
            ]
        }
    ],
    mukbang: [
        {
            title: "健康争议压力",
            description: "吃播内容被质疑不健康，平台开始收紧推荐。",
            requirements: { minRank: "初级达人" },
            options: [
                {
                    text: "调整节奏与内容",
                    effects: { personaFit: 5, contentQuality: 4, fans: -100 },
                    type: 'mixed'
                },
                {
                    text: "坚持原有风格",
                    effects: { fans: 300, personaFit: -6, mood: -4 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "供应链翻车",
            description: "合作餐品出现问题，舆论开始波及你的信誉。",
            requirements: { minRank: "中级达人" },
            options: [
                {
                    text: "公开致歉并赔付",
                    effects: { savings: -1200, personaFit: 6, mood: -5 },
                    type: 'mixed'
                },
                {
                    text: "切换合作方",
                    effects: { savings: -800, fans: -150, contentQuality: 2 },
                    type: 'mixed'
                }
            ]
        }
    ],
    beauty: [
        {
            title: "过度滤镜质疑",
            description: "粉丝怀疑滤镜过重，真实性受到挑战。",
            requirements: { minRank: "初级达人" },
            options: [
                {
                    text: "开放素颜测评",
                    effects: { personaFit: 6, mood: -3, fans: 200 },
                    type: 'mixed'
                },
                {
                    text: "维持风格",
                    effects: { fans: 300, personaFit: -5 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "成分党对线",
            description: "成分党对你的推荐提出质疑，要求更严格证据。",
            requirements: { minRank: "中级达人" },
            options: [
                {
                    text: "补充评测数据",
                    effects: { contentQuality: 6, savings: -1000, personaFit: 4 },
                    type: 'mixed'
                },
                {
                    text: "减少争议品推荐",
                    effects: { profit: -800, personaFit: 3 },
                    type: 'negative'
                }
            ]
        }
    ],
    lifestyle: [
        {
            title: "生活方式被质疑",
            description: "部分粉丝认为你的生活方式不够真实接地气。",
            requirements: { minRank: "初级达人" },
            options: [
                {
                    text: "增加真实日常",
                    effects: { personaFit: 6, contentQuality: 2 },
                    type: 'mixed'
                },
                {
                    text: "坚持精致路线",
                    effects: { fans: 300, personaFit: -4 },
                    type: 'mixed'
                }
            ]
        },
        {
            title: "场景成本上升",
            description: "高质量场景拍摄带来更高成本与运营压力。",
            requirements: { minRank: "中级达人" },
            options: [
                {
                    text: "维持高质感",
                    effects: { contentQuality: 6, savings: -1500 },
                    type: 'mixed'
                },
                {
                    text: "简化场景",
                    effects: { fans: -200, mood: -3 },
                    type: 'negative'
                }
            ]
        }
    ]
};

// 低属性触发的错失机会事件
const MissedOpportunityEvents = [
    {
        title: "镜头感不足错失邀约",
        description: "品牌看中你的内容，但试镜表现一般，合作机会流失。",
        requirements: { maxAttributes: { cameraSense: 4 } },
        options: [
            {
                text: "遗憾错过",
                effects: { mood: -6, fans: -100, personaFit: -4 },
                type: 'negative'
            }
        ]
    },
    {
        title: "颜值不达标被替换",
        description: "广告拍摄临时换人，你被替换出项目。",
        requirements: { maxAttributes: { appearance: 4 } },
        options: [
            {
                text: "无奈接受",
                effects: { mood: -8, personaFit: -3, fans: -80 },
                type: 'negative'
            }
        ]
    },
    {
        title: "学历深度不足被质疑",
        description: "专业合作方担心你的输出深度，最终选择了更专业的创作者。",
        requirements: { maxAttributes: { education: 4 } },
        options: [
            {
                text: "反思提升",
                effects: { mood: -5, contentQuality: -4 },
                type: 'negative'
            }
        ]
    },
    {
        title: "幽默感欠缺带货失败",
        description: "直播间气氛冷场，带货转化不佳，合作方失望。",
        requirements: { maxAttributes: { humor: 4 } },
        options: [
            {
                text: "结束直播",
                effects: { mood: -6, fans: -120, personaFit: -3 },
                type: 'negative'
            }
        ]
    },
    {
        title: "气质不稳错过商务",
        description: "品牌希望更稳定的气质形象，最终选择他人合作。",
        requirements: { maxAttributes: { temperament: 4 } },
        options: [
            {
                text: "调整方向",
                effects: { mood: -4, personaFit: -5 },
                type: 'negative'
            }
        ]
    }
];

// 真实年份时间线事件（谐音原型）
const TimelineEvents = [
    {
        id: "2026-01-algo-update",
        year: 2026,
        month: 1,
        title: "平台算法大升级",
        description: "平台宣布算法升级，偏好“高完播+高互动”的内容，旧套路可能失效。",
        options: [
            {
                text: "优化内容结构，提升完播",
                effects: { contentQuality: 8, personaFit: 5, fans: 300, energy: -10, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "跟风做高互动热点",
                effects: { fans: 800, profit: 600, contentQuality: -6, personaFit: -5, rankProgress: -4 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2026-03-short-drama-boom",
        year: 2026,
        month: 3,
        title: "短剧赛道爆火",
        description: "剧情类短剧大爆发，平台流量倾斜明显，很多博主开始转型。",
        options: [
            {
                text: "尝试短剧合作",
                effects: { fans: 1000, profit: 1200, contentQuality: -4, energy: -15, rankProgress: 4 },
                type: 'mixed'
            },
            {
                text: "坚持原赛道",
                effects: { personaFit: 8, contentQuality: 6, fans: -100, rankProgress: 6 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2026-06-compliance-check",
        year: 2026,
        month: 6,
        title: "平台合规审查升级",
        description: "平台加强内容合规审查，涉及营销话术、广告标注与虚假宣传的风险显著提高。",
        options: [
            {
                text: "主动自查与整改",
                effects: { personaFit: 10, contentQuality: 5, savings: -500, rankProgress: 8 },
                type: 'mixed'
            },
            {
                text: "暂时观望",
                effects: { fans: -200, mood: -5, rankProgress: -2 },
                type: 'negative'
            }
        ]
    },
    {
        id: "2026-09-live-trust-crisis",
        year: 2026,
        month: 9,
        title: "直播带货信任危机",
        description: "多位头部主播翻车引发信任危机，粉丝对带货内容更谨慎。",
        options: [
            {
                text: "提高选品与质检",
                effects: { contentQuality: 8, personaFit: 8, savings: -800, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "减少带货比重",
                effects: { savings: -1200, contentQuality: 6, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "加大折扣刺激成交",
                effects: { profit: 1500, fans: 500, personaFit: -8, contentQuality: -6, rankProgress: -6 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2027-01-ai-content-regulation",
        year: 2027,
        month: 1,
        title: "AI内容监管落地",
        description: "平台发布AI生成内容规范，要求标注与审核，违规成本上升。",
        options: [
            {
                text: "严格标注并减少AI使用",
                effects: { personaFit: 10, contentQuality: 6, rankProgress: 8, savings: -300 },
                type: 'mixed'
            },
            {
                text: "继续使用但加强审核",
                effects: { fans: 400, profit: 800, contentQuality: -4, personaFit: -5, rankProgress: -3 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2027-07-aesthetic-upgrade",
        year: 2027,
        month: 7,
        title: "审美升级潮",
        description: "平台整体审美升级，高质感画面与稳定人设成为新门槛。",
        options: [
            {
                text: "升级设备与视觉风格",
                effects: { contentQuality: 10, personaFit: 6, savings: -1500, rankProgress: 8 },
                type: 'mixed'
            },
            {
                text: "保持现有风格",
                effects: { fans: -200, rankProgress: -4 },
                type: 'negative'
            }
        ]
    },
    {
        id: "2026-10-compliance-chain-start",
        year: 2026,
        month: 10,
        title: "合规风暴·预警",
        description: "平台发出合规预警通知，表示将对广告标注与虚假宣传进行专项治理。",
        options: [
            {
                text: "提前自查整改",
                effects: { contentQuality: 6, personaFit: 8, savings: -500, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "观望市场反应",
                effects: { fans: -100, mood: -5, rankProgress: -2 },
                type: 'negative'
            }
        ],
        nextId: "chain-compliance-2"
    },
    {
        id: "2027-02-shortdrama-chain-start",
        year: 2027,
        month: 2,
        title: "短剧出圈·起势",
        description: "短剧内容持续爆火，平台开始扶持“短剧创作者计划”。",
        options: [
            {
                text: "尝试跨界短剧",
                effects: { fans: 1200, profit: 1500, contentQuality: -4, energy: -15, rankProgress: 5 },
                type: 'mixed'
            },
            {
                text: "坚持主赛道",
                effects: { personaFit: 8, contentQuality: 6, fans: -100, rankProgress: 6 },
                type: 'mixed'
            }
        ],
        nextId: "chain-shortdrama-2"
    }
];

// 年度大事件（每年固定月份触发）
const AnnualEvents = [
    {
        id: "2026-annual-awards",
        year: 2026,
        month: 12,
        title: "年度创作者盛典",
        description: "年度创作者盛典开启，你有机会提名或参与活动曝光。",
        options: [
            {
                text: "积极参与评选",
                effects: { fans: 1200, personaFit: 8, rankProgress: 12, energy: -10 },
                type: 'mixed'
            },
            {
                text: "低调观望，专注内容",
                effects: { contentQuality: 8, personaFit: 6, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2027-annual-report",
        year: 2027,
        month: 12,
        title: "年度行业风向报告",
        description: "行业报告发布，平台流量倾向与商业机会出现新变化。",
        options: [
            {
                text: "调整策略，迎合新趋势",
                effects: { fans: 1000, profit: 1200, personaFit: -4, contentQuality: -3, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "坚持路线，稳步提升",
                effects: { contentQuality: 8, personaFit: 8, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2028-annual-fan-meetup",
        year: 2028,
        month: 12,
        title: "年度粉丝见面会",
        description: "年度粉丝见面会邀约开启，可大幅提升黏性但消耗巨大。",
        options: [
            {
                text: "举办线下见面会",
                effects: { fans: 1500, personaFit: 12, mood: 10, energy: -20, savings: -1000, rankProgress: 10 },
                type: 'mixed'
            },
            {
                text: "仅做线上活动",
                effects: { fans: 800, personaFit: 8, mood: 5, energy: -10, rankProgress: 6 },
                type: 'mixed'
            }
        ]
    }
];

// 按类别定制的年度大事件（示例：每年12月）
const AnnualEventsByCategory = [
    {
        id: "2026-annual-science",
        year: 2026,
        month: 12,
        categoryId: "science",
        title: "年度科普创作者榜单",
        description: "平台发布年度科普创作者榜单，你有机会冲榜。",
        options: [
            {
                text: "冲榜，打磨精品内容",
                effects: { contentQuality: 10, personaFit: 8, fans: 800, energy: -15, rankProgress: 10 },
                type: 'mixed'
            },
            {
                text: "稳定输出，稳步前进",
                effects: { contentQuality: 6, personaFit: 6, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2026-annual-mukbang",
        year: 2026,
        month: 12,
        categoryId: "mukbang",
        title: "年度吃播盛典",
        description: "年度吃播盛典开启，头部吃播齐聚一堂。",
        options: [
            {
                text: "积极参会，扩大人脉",
                effects: { fans: 900, personaFit: 6, profit: 1200, energy: -10, rankProgress: 8 },
                type: 'mixed'
            },
            {
                text: "低调观望，专注内容",
                effects: { contentQuality: 6, personaFit: 6, rankProgress: 6 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2026-annual-beauty",
        year: 2026,
        month: 12,
        categoryId: "beauty",
        title: "年度美妆风尚夜",
        description: "美妆风尚夜开启，品牌与博主集中曝光。",
        options: [
            {
                text: "参与活动，争取曝光",
                effects: { fans: 1200, profit: 2000, personaFit: 6, rankProgress: 10 },
                type: 'mixed'
            },
            {
                text: "专注作品，保持人设",
                effects: { contentQuality: 8, personaFit: 8, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "2026-annual-lifestyle",
        year: 2026,
        month: 12,
        categoryId: "lifestyle",
        title: "年度生活方式节",
        description: "生活方式节开启，强调“真实与质感”的内容风格。",
        options: [
            {
                text: "参与活动，展示风格",
                effects: { fans: 900, personaFit: 8, contentQuality: 6, rankProgress: 8 },
                type: 'mixed'
            },
            {
                text: "保持日常，稳定输出",
                effects: { personaFit: 6, mood: 5, rankProgress: 6 },
                type: 'mixed'
            }
        ]
    }
];

// 粉丝规模/职级触发的大事件
const MilestoneEvents = [
    {
        id: "milestone-10k-fans",
        minFans: 10000,
        title: "粉丝破万庆典",
        description: "粉丝数突破1万，是否举办小型庆典活动？",
        options: [
            {
                text: "举办庆典，回馈粉丝",
                effects: { fans: 800, mood: 10, savings: -500, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "低调庆祝，继续创作",
                effects: { personaFit: 6, contentQuality: 4, rankProgress: 4 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "milestone-100k-fans",
        minFans: 100000,
        title: "十万粉丝纪念",
        description: "粉丝突破十万，品牌合作与曝光机会明显增加。",
        options: [
            {
                text: "推出纪念企划",
                effects: { fans: 1500, profit: 1200, energy: -15, rankProgress: 10 },
                type: 'mixed'
            },
            {
                text: "保持节奏，稳步发展",
                effects: { contentQuality: 6, personaFit: 6, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "milestone-rank-high",
        minRank: "高级达人",
        title: "行业邀约升级",
        description: "你已跻身高级创作者，行业邀约和资源明显升级。",
        options: [
            {
                text: "接受邀约，扩大影响",
                effects: { fans: 1200, profit: 2000, personaFit: -4, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "精选合作，保证质量",
                effects: { contentQuality: 8, personaFit: 8, rankProgress: 8 },
                type: 'mixed'
            }
        ]
    },
    {
        id: "milestone-rank-head",
        minRank: "头部达人",
        title: "头部创作者圆桌",
        description: "平台邀请你参与头部创作者圆桌讨论，曝光度高但要求严格。",
        options: [
            {
                text: "积极参与",
                effects: { fans: 2000, personaFit: 8, energy: -10, rankProgress: 10 },
                type: 'mixed'
            },
            {
                text: "婉拒参加",
                effects: { personaFit: 6, mood: 5, rankProgress: 4 },
                type: 'mixed'
            }
        ]
    }
];

// 连续剧情事件链
const ChainEvents = {
    "chain-compliance-2": {
        id: "chain-compliance-2",
        title: "合规风暴·抽检",
        description: "平台对部分创作者进行内容抽检，广告标注与话术合规成为重点。",
        options: [
            {
                text: "主动配合抽检",
                effects: { personaFit: 8, contentQuality: 6, savings: -300, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "紧急下架争议内容",
                effects: { fans: -200, contentQuality: 4, rankProgress: 4 },
                type: 'mixed'
            }
        ],
        nextId: "chain-compliance-3"
    },
    "chain-compliance-3": {
        id: "chain-compliance-3",
        title: "合规风暴·处置结果",
        description: "平台公布处置结果，合规创作者获得推荐加权。",
        options: [
            {
                text: "发布合规声明，稳住口碑",
                effects: { personaFit: 10, fans: 500, rankProgress: 8 },
                type: 'mixed'
            },
            {
                text: "专注内容，不做声明",
                effects: { contentQuality: 6, fans: 200, rankProgress: 5 },
                type: 'mixed'
            }
        ]
    },
    "chain-shortdrama-2": {
        id: "chain-shortdrama-2",
        title: "短剧出圈·磨合",
        description: "跨界短剧带来关注，但制作节奏与成本压力明显上升。",
        options: [
            {
                text: "增加编剧与制作投入",
                effects: { contentQuality: 8, fans: 700, savings: -800, energy: -15, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "保持轻量化短剧",
                effects: { fans: 500, profit: 400, contentQuality: -4, rankProgress: 4 },
                type: 'mixed'
            }
        ],
        nextId: "chain-shortdrama-3"
    },
    "chain-shortdrama-3": {
        id: "chain-shortdrama-3",
        title: "短剧出圈·口碑分化",
        description: "短剧成绩尚可，但粉丝对你主赛道内容的期待开始下降。",
        options: [
            {
                text: "回归主赛道",
                effects: { personaFit: 8, contentQuality: 8, fans: -200, rankProgress: 6 },
                type: 'mixed'
            },
            {
                text: "双线并行",
                effects: { fans: 600, profit: 800, contentQuality: -6, energy: -20, rankProgress: 3 },
                type: 'mixed'
            }
        ]
    }
};
