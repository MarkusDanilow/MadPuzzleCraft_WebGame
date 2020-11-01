/*
        @licstart  The following is the entire license notice for the
        JavaScript code in this page.

        Copyright (C) 2017  Markus A. Danilow

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */


/**
 *  This library allows you to easily generate all kinds of HTML elements using JavaScript and jQuery.
 *  Notice: ECMAScript6 is required!
 *
 * TODO: Support for <rt>, <rp>, <ruby>
 */
//region CONSTRUCTOR
function HtmlGenerator() {}

//endregion

//region LIST OF ALL ELEMENT TYPES
HtmlGenerator.elementTypes = {
    a: 'a',
    abbr: 'abbr',
    address: 'address',
    article: 'article',
    aside: 'aside',
    audio: 'audio',
    b: 'b',
    base: 'base',
    bdi: 'bdi',
    bdo: 'bdo',
    blockQuote: 'blockquote',
    body: 'body',
    br: 'br',
    button: 'button',
    canvas: 'canvas',
    code: 'code',
    cite: 'cite',
    column: {},
    dataList: 'datalist',
    description: {
        dd: 'dd',
        dl: 'dl',
        dt: 'dt'
    },
    del: 'del',
    details: 'details',
    dfn: 'dfn',
    dialog: 'dialog',
    div: 'div',
    em: 'em',
    embed: 'embed',
    fieldSet: 'fieldset',
    figure: {
        figCaption: 'figcaption',
        figure: 'figure'
    },
    footer: 'footer',
    form: 'form',
    headings: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6'
    },
    head: 'head',
    header: 'header',
    hr: 'hr',
    html: 'html',
    i: 'i',
    iFrame: 'iframe',
    img: 'img',
    input: {
        input: 'input',
        button: 'button',
        checkBox: 'checkbox',
        color: 'color',
        date: 'date',
        dateTimeLocal: 'datetime-local',
        eMail: 'email',
        file: 'file',
        hidden: 'hidden',
        image: 'image',
        month: 'month',
        number: 'number',
        password: 'password',
        radio: 'radio',
        range: 'range',
        reset: 'reset',
        search: 'search',
        submit: 'submit',
        tel: 'tel',
        text: 'text',
        time: 'time',
        url: 'url',
        week: 'week'
    },
    ins: 'ins',
    kbd: 'kbd',
    keyGen: 'keygen',
    label: 'label',
    legend: 'legend',
    list: {
        li: 'li',
        ul: 'ul',
        ol: 'ol'
    },
    link: 'link',
    main: 'main',
    map: {
        area: 'area',
        map: 'map'
    },
    mark: 'mark',
    menu: {
        menu: 'menu',
        menuItem: 'menuitem'
    },
    meta: 'meta',
    meter: 'meter',
    nav: 'nav',
    noScript: 'noscript',
    object: 'object',
    output: 'output',
    select: {
        select: 'select',
        option: 'option',
        optGroup: 'optgroup'
    },
    p: 'p',
    param: 'param',
    picture: 'picture',
    pre: 'pre',
    progress: 'progress',
    q: 'q',
    rp: 'rp',
    rt: 'rt',
    ruby: 'ruby',
    s: 's',
    samp: 'samp',
    script: 'script',
    section: 'section',
    small: 'small',
    source: 'source',
    span: 'span',
    strong: 'strong',
    style: 'style',
    sub: 'sub',
    summary: 'summary',
    sup: 'sup',
    table: {
        caption: 'caption',
        table: 'table',
        tBody: 'tbody',
        td: 'td',
        th: 'th',
        tr: 'tr',
        tFoot: 'tfoot',
        tHead: 'thead',
        col: 'col',
        colGroup: 'colgroup'
    },
    textArea: 'textarea',
    time: 'time',
    title: 'title',
    u: 'u',
    var: 'var',
    video: 'video',
    wbr: 'wbr'
};
//endregion

//region UTILITY FUNCTIONS
/**
 *
 * @param obj
 * @returns {number}
 */
HtmlGenerator.getObjectSize = (obj) => {
    let size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 *
 * @param arr
 * @returns {{}}
 */
HtmlGenerator.convertArrayToObject = (arr) => {
    let obj = {};
    if (arr && arr.length && arr.length > 0) {
        $.each(arr, (k, v) => {
            obj[k] = { value: v, text: v };
        });
    } else if (arr && !arr.length)
        obj = arr;
    return obj;
};

/**
 *
 * @param obj
 * @param keyValueList
 */
HtmlGenerator.initObjectWithValues = (obj, keyValueList) => {
    if (!obj) obj = {};
    $.each(keyValueList, (k, v) => {
        obj[k] = v;
    });
    return obj;
};

//endregion

//region BASIC GENERATION METHODS
/**
 *
 * @param parent
 * @param child
 * @param appendFlag
 * @returns {*}
 */
HtmlGenerator.addToParent = (parent, child, appendFlag) => {
    if (parent) {
        if (appendFlag) parent.append(child);
        else parent.prepend(child);
    }
    return child;
};

/**
 *
 * @param parent
 * @param elementType
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBasicHtmlElement = (parent, elementType, id, clazz, appendFlag, attributes = {}) => {
    if (!elementType) return null;
    if (!id) id = '';
    if (!clazz) clazz = '';
    let element = $(document.createElement(elementType));
    if (id.length > 0)
        element.attr('id', id);
    if (clazz.length > 0)
        element.addClass(clazz);
    if (attributes) {
        $.each(attributes, (attrName, attrValue) => {
            if (attrName.indexOf('text') > -1)
                element.text(attrValue);
            else if (attrName.indexOf('html') > -1)
                element.html(attrValue);
            else if (attrName.indexOf('clazz') > -1)
                element.addClass(attrValue);
            else
                element.attr(attrName, attrValue);
        });
    }
    return HtmlGenerator.addToParent(parent, element, appendFlag);
};

/**
 *
 * @param parent
 * @param elementType
 * @param appendFlag
 * @param attributeList
 * @param generateFn
 */
HtmlGenerator.generateInnerElements = (parent, elementType, appendFlag, attributeList = {}, generateFn = (parent, id, clazz, appendFlag, elementAttributes = {}) => {}) => {
    if (attributeList) {
        $.each(attributeList, (k, attributes) => {
            let elementId = null;
            let clazz = null;
            if (attributes.id) elementId = attributes.id;
            if (attributes.clazz) clazz = attributes.clazz;
            if (generateFn && typeof generateFn === 'function')
                generateFn(parent, elementId, clazz, appendFlag, attributes);
            else
                HtmlGenerator.generateBasicHtmlElement(parent, elementType, elementId, clazz, appendFlag, attributes);
        });
    }
};
//endregion

//region COMMENT DEFINITIONS
/**
 * @param parent
 * @param commentMessage
 * @param appendFlag
 * @returns {jQuery|HTMLElement}
 */
HtmlGenerator.generateComment = (parent, commentMessage, appendFlag) => {
    let comment = $(document.createComment(commentMessage));
    return HtmlGenerator.addToParent(parent, comment, appendFlag);
};
//endregion

//region BASE LINK AND HYPERLINK
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHyperlink = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.a, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBaseLink = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.base, id, clazz, appendFlag, attributes);
};
//endregion

//region ABBREVIATION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAbbreviation = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.abbr, id, clazz, appendFlag, attributes);
};
//endregion

//region ADDRESS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAddress = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.address, id, clazz, appendFlag, attributes);
};
//endregion

//region MAP AND AREA
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateArea = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.map.area, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param areaAttributes
 * @returns {*}
 */
HtmlGenerator.generateMap = (parent, id, clazz, appendFlag, attributes = {}, areaAttributes = {}) => {
    let map = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.map.map, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(map, null, true, areaAttributes, HtmlGenerator.generateArea);
    return map;
};
//endregion

//region ARTICLE
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateArticle = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.article, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeader = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.header, id, clazz, appendFlag, attributes);
};
//endregion

//region ASIDE
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateAside = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.aside, id, clazz, appendFlag, attributes);
};
//endregion

//region AUDIO, TRACK, VIDEO AND SOURCE TAGS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param sources
 * @param tracks
 * @returns {*}
 */
HtmlGenerator.generateAudio = (parent, id, clazz, appendFlag, attributes = {}, sources = {}, tracks = {}) => {
    let audio = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.audio, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(audio, null, true, sources, HtmlGenerator.generateSource);
    HtmlGenerator.generateInnerElements(audio, null, true, tracks, HtmlGenerator.generateTrack);
    return audio;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param sources
 * @param tracks
 * @returns {*}
 */
HtmlGenerator.generateVideo = (parent, id, clazz, appendFlag, attributes = {}, sources = {}, tracks = {}) => {
    let audio = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.video, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(audio, null, true, sources, HtmlGenerator.generateSource);
    HtmlGenerator.generateInnerElements(audio, null, true, tracks, HtmlGenerator.generateTrack);
    return audio;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSource = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.source, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateTrack = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.source, id, clazz, appendFlag, attributes);
};

//endregion

//region BASIC HTML DOCUMENT TAGS [head, body, html, link, meta, title]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBody = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.body, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHead = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.head, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateTitle = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.title, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHtml = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.html, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateLink = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.link, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateMeta = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.meta, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateNoScript = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.noScript, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateScript = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.script, id, clazz, true, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateStyle = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.style, id, clazz, true, attributes);
};
//endregion

//region CANVAS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCanvas = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.canvas, id, clazz, appendFlag, attributes);
};
//endregion

//region TABLE DEFINITIONS AND EVERYTHING THAT HAS TO DO WITH TABLES

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCaption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.caption, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCol = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.col, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param cols
 * @returns {*}
 */
HtmlGenerator.generateColGroup = (parent, id, clazz, appendFlag, attributes = {}, cols = {}) => {
    let group = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.colGroup, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(group, null, true, cols, HtmlGenerator.generateCol);
    return group;
};
//endregion

//region DROP DOWN MENU DEFINITIONS [Selects, Options, Data lists,...]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param options
 * @param inputAttributes
 * @returns {*}
 */
HtmlGenerator.generateDataList = (parent, id, clazz, appendFlag, attributes = {}, options = {}, inputAttributes = {}) => {
    let list = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dataList, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(list, null, true, HtmlGenerator.convertArrayToObject(options), HtmlGenerator.generateOption);
    HtmlGenerator.generateInput(parent, null, null, true, inputAttributes);
    return list;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateOption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.select.option, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param optionAttributes
 * @returns {*}
 */
HtmlGenerator.generateOptionGroup = (parent, id, clazz, appendFlag, attributes = {}, optionAttributes = {}) => {
    let group = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.select.optGroup, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(group, null, true, optionAttributes, HtmlGenerator.generateOption);
    return group;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param optionAttributes
 * @returns {*}
 */
HtmlGenerator.generateSelect = (parent, id, clazz, appendFlag, attributes = {}, optionAttributes = {}) => {
    let select = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.select.select, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(select, null, true, optionAttributes, HtmlGenerator.generateOption);
    return select;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param optionGroupAttributes
 * @param optionAttributes
 * @returns {*}
 */
HtmlGenerator.generateSelectWithOptionGroups = (parent, id, clazz, appendFlag, attributes = {}, optionGroupAttributes = {}, optionAttributes = {}) => {
    let select = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.select.select, id, clazz, appendFlag, attributes);
    $.each(optionGroupAttributes, (k, optGroupAttr) => {
        if (optionAttributes[k])
            HtmlGenerator.generateOptionGroup(select, null, null, true, optGroupAttr, optionAttributes[k]);
    });
    return select;
};

//endregion

//region LIST DEFINITIONS  [ul, ol, li]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateListElement = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.list.li, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param liAttributes
 * @returns {*}
 */
HtmlGenerator.generateUnorderedList = (parent, id, clazz, appendFlag, attributes = {}, liAttributes = {}) => {
    let ul = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.list.ul, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(ul, null, true, HtmlGenerator.convertArrayToObject(liAttributes), HtmlGenerator.generateListElement);
    return ul;
};


/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param liAttributes
 * @returns {*}
 */
HtmlGenerator.generateOrderedList = (parent, id, clazz, appendFlag, attributes = {}, liAttributes = {}) => {
    let ul = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.list.ol, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(ul, null, true, HtmlGenerator.convertArrayToObject(liAttributes), HtmlGenerator.generateListElement);
    return ul;
};

//endregion

//region INPUT FIELD DEFINITIONS

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateButton = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.button, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateInput = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.input.input, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateKeyGen = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.keyGen, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateLabel = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.label, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateTextArea = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.textArea, id, clazz, appendFlag, attributes);
};

//endregion

//region DESCRIPTION LIST DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionValue = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dd, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionTerm = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dt, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDescriptionList = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.description.dl, id, clazz, appendFlag, attributes);
};
//endregion

//region DETAILS DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDetails = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.details, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSummary = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.summary, id, clazz, appendFlag, attributes);
};
//endregion

//region DEFINING INSTANCE DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDefiningInstance = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dfn, id, clazz, appendFlag, attributes);
};
//endregion

//region DIALOG DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDialog = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.dialog, id, clazz, appendFlag, attributes);
};
//endregion

//region CONTAINER DEFINITIONS [div, nav]
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDiv = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.div, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateNav = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.nav, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSection = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.section, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateParagraph = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.p, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSpan = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.span, id, clazz, appendFlag, attributes);
};
//endregion

//region TEXT MODIFICATION DEFINITIONS [Bold, Deleted, Inserted, Emphasized]

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBoldText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.b, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateStrongText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.strong, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateItalicText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.i, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateUnerlinedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.u, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateDeletedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.del, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateInsertedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.ins, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateEmphasizedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.em, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBiDirectionalIsolation = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.bdi, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBiDirectionalOverride = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.bdo, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateBlockQuote = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.blockQuote, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateLineBreak = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.br, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateWordBreakOpportunity = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.wbr, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCite = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.cite, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateCode = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.code, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateKeyboardText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.kbd, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateMarkedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.mark, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateOutput = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.output, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generatePreFormattedText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.pre, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateQuote = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.q, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateIncorrectText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.s, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSampleOutput = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.samp, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSmallText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.small, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateSubscriptText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.sub, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateVariable = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.var, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateTimeText = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.time, id, clazz, appendFlag, attributes);
};

//endregion

//region EMBEDDED ELEMENTS DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateEmbeddedElement = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.embed, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param paramAttributes
 * @returns {*}
 */
HtmlGenerator.generateObject = (parent, id, clazz, appendFlag, attributes = {}, paramAttributes = {}) => {
    let object = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.object, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(object, null, true, paramAttributes, HtmlGenerator.generateParam);
    return object;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateParam = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.param, id, clazz, appendFlag, attributes);
};

//endregion

//region FIELD SET DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFieldSet = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.fieldSet, id, clazz, appendFlag, attributes);
};
//endregion


//region MAIN TAG DEFINITION
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateMain = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.main, id, clazz, appendFlag, attributes);
};
//endregion

//region FIGURE DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param imgAttributes
 * @param figCaptionAttributes
 * @returns {*}
 */
HtmlGenerator.generateFigure = (parent, id, clazz, appendFlag, attributes = {}, imgAttributes = {}, figCaptionAttributes = {}) => {
    let figure = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.figure.figure, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateImage(figure, null, null, true, imgAttributes);
    HtmlGenerator.generateFigureCaption(figure, null, null, true, figCaptionAttributes);
    return figure;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFigureCaption = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.figure.figCaption, id, clazz, appendFlag, attributes);
};
//endregion

//region IMAGE DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateImage = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.img, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param mapAttributes
 * @param areaAttributes
 * @returns {*}
 */
HtmlGenerator.generateImageWithMap = (parent, id, clazz, appendFlag, attributes = {}, mapAttributes = {}, areaAttributes = {}) => {
    if (!mapAttributes || !mapAttributes.name) return null;
    attributes.usemap = mapAttributes.name;
    let map = HtmlGenerator.generateMap(parent, null, null, true, mapAttributes, areaAttributes);
    let img = HtmlGenerator.generateImage(parent, id, clazz, appendFlag, attributes);
    return [img, map];
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param sourceAttributes
 * @param imageAttributes
 * @returns {*}
 */
HtmlGenerator.generatePicture = (parent, id, clazz, appendFlag, attributes = {}, sourceAttributes = {}, imageAttributes = {}) => {
    let picture = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.picture, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(picture, null, true, sourceAttributes, HtmlGenerator.generateSource);
    HtmlGenerator.generateImage(picture, null, null, true, imageAttributes);
    return picture;
};

//endregion

//region FOOTER DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateFooter = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.footer, id, clazz, appendFlag, attributes);
};
//endregion

//region FORM DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateForm = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.form, id, clazz, appendFlag, attributes);
};


/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateLegend = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.legend, id, clazz, appendFlag, attributes);
};

//endregion

//region HEADING DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading = (parent, id, clazz, appendFlag, attributes = {}) => {
    if (!attributes.type || attributes.type.length !== 2) return null;
    let headingType = HtmlGenerator.elementTypes.headings[attributes.type];
    delete attributes.type;
    return HtmlGenerator.generateBasicHtmlElement(parent, headingType, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading1 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h1 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading2 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h2 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading3 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h3 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading4 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h4 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading5 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h5 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateHeading6 = (parent, id, clazz, appendFlag, attributes = {}) => {
    attributes = HtmlGenerator.initObjectWithValues(attributes, { type: HtmlGenerator.elementTypes.headings.h6 });
    return HtmlGenerator.generateHeading(parent, id, clazz, appendFlag, attributes);
};

//endregion

//region HORIZONTAL LINE
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateHorizontalLine = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.hr, id, clazz, appendFlag, attributes);
};
//endregion

//region I-FRAME
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateIFrame = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.iFrame, id, clazz, appendFlag, attributes);
};
//endregion

//region MENU DEFINITIONS
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateMenuItem = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.menu.menuItem, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param menuItemAttributes
 * @returns {*}
 */
HtmlGenerator.generateMenu = (parent, id, clazz, appendFlag, attributes = {}, menuItemAttributes = {}) => {
    let menu = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.iFrame, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(menu, null, true, menuItemAttributes, HtmlGenerator.generateMenuItem);
    return menu;
};
//endregion


//region PROGRESS BAR / METER
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateMeter = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.meter, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateProgress = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.progress, id, clazz, appendFlag, attributes);
};
//endregion

//region TABLE STUFF
/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateEmptyTable = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.table, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param rowAttributes
 * @param dataAttributes
 */
HtmlGenerator.generateSimpleTable = (parent, id, clazz, appendFlag, attributes = {}, rowAttributes = {}, dataAttributes = {}) => {
    let table = HtmlGenerator.generateEmptyTable(parent, id, clazz, appendFlag, attributes);
    if (rowAttributes) {
        $.each(rowAttributes, (k, attributes) => {
            HtmlGenerator.generateTableRow(table, null, null, true, attributes, dataAttributes[k]);
        });
    }
    return table;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param rowAttributes
 * @param dataAttributes
 * @param headerAttributes
 * @param footerAttributes
 */
HtmlGenerator.generateComplexTable = (parent, id, clazz, appendFlag, attributes = {}, rowAttributes = {}, dataAttributes = {}, headerAttributes = null, footerAttributes = null) => {
    let table = HtmlGenerator.generateEmptyTable(parent, id, clazz, appendFlag, attributes);
    let body = HtmlGenerator.generateTableBody(table, null, null, true, null);
    const mindHeader = (headerAttributes !== null && headerAttributes !== undefined);
    const mindFooter = (footerAttributes !== null && footerAttributes !== undefined);
    if (rowAttributes) {
        let index = 0;
        let numAttributes = HtmlGenerator.getObjectSize(rowAttributes);
        $.each(rowAttributes, (k, attributes) => {
            if (index <= 0 && mindHeader)
                HtmlGenerator.generateTableHeader(table, null, null, true, headerAttributes, attributes, dataAttributes[k]);
            else if (index >= numAttributes - 1 && mindFooter)
                HtmlGenerator.generateTableFooter(table, null, null, true, footerAttributes, attributes, dataAttributes[k]);
            else
                HtmlGenerator.generateTableRow(body, null, null, true, attributes, dataAttributes[k]);
            index++;
        });
    }
    return table;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 */
HtmlGenerator.generateTableData = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.td, id, clazz, appendFlag, attributes);
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param dataAttributes
 * @returns {*}
 */
HtmlGenerator.generateTableRow = (parent, id, clazz, appendFlag, attributes = {}, dataAttributes = {}) => {
    let row = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.tr, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateInnerElements(row, null, true, HtmlGenerator.convertArrayToObject(dataAttributes), HtmlGenerator.generateTableData);
    return row;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param rowAttributes
 * @param dataAttributes
 * @returns {*}
 */
HtmlGenerator.generateTableHeader = (parent, id, clazz, appendFlag, attributes = {}, rowAttributes = {}, dataAttributes = {}) => {
    let header = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.tHead, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateTableRow(header, null, null, true, rowAttributes, dataAttributes);
    return header;
};


/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @param rowAttributes
 * @param dataAttributes
 * @returns {*}
 */
HtmlGenerator.generateTableFooter = (parent, id, clazz, appendFlag, attributes = {}, rowAttributes = {}, dataAttributes = {}) => {
    let footer = HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.tFoot, id, clazz, appendFlag, attributes);
    HtmlGenerator.generateTableRow(footer, null, null, true, rowAttributes, dataAttributes);
    return footer;
};

/**
 *
 * @param parent
 * @param id
 * @param clazz
 * @param appendFlag
 * @param attributes
 * @returns {*}
 */
HtmlGenerator.generateTableBody = (parent, id, clazz, appendFlag, attributes = {}) => {
    return HtmlGenerator.generateBasicHtmlElement(parent, HtmlGenerator.elementTypes.table.tBody, id, clazz, appendFlag, attributes);
};


//endregion