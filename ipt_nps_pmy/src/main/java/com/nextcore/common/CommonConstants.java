/*
 * Copyright (c) 2019 NEXTCORE, Ltd. All Rights Reserved.
 */
package com.nextcore.common;


/**
 * File Name : CommonConstants.java
 * <p>
 * Description : project constants
 *
 * @since 2019. 2. 26.
 *
 *        <pre>
 * History
 * Date             Name                Description
 * 2019. 2. 26.     dev_77        최초 작성
 *        </pre>
 */
public interface CommonConstants {


    public static interface RETVAL {


        public static interface BOOL {

            public static final boolean SUCCESS = true;

            public static final boolean FAIL   = false;

        }

        public static interface INT {

            public static final int SUCCESS = 1;

            public static final int FAIL   = 0;

            public static final int FLAG   = 2;

        }

        public static interface STRING {

            public static final String SUCCESS = "SUCCESS";

            public static final String FAIL   = "FAIL";

        }


    }


    public static final String YES = "Y";

    public static final String NO  = "N";


}
