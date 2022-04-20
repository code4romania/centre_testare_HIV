import React from 'react';
import { Trans } from '@lingui/macro';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const PolicyFragment = () => {
  return (
    <div style={{ padding: '32px 0' }}>
      <Title level={3}>
        <Trans>What is a "cookie"</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookie ("browser cookie" or "HTTP cookie") is a small file, consisting of letters and
          numbers, which is stored on any terminal with internet access (computer, mobile phone,
          tablet, etc.) and is installed by request issued by a web server to a browser (eg Internet
          Explorer, Chrome). Please note: "Cookies" do not contain software, viruses or spyware and
          cannot access the information on the user's hard drive.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          A cookie consists of a name and content, the duration of its existence being determined,
          and can be accessed again by the webserver when a user returns to the website associated
          with that webserver.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Cookies do not require personal information and do not personally identify internet users.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Session cookies - these are temporarily stored in the browser history that stores them
          until the user logs out of that website or closes the browser window.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Persistent Cookies - These are stored, depending on the default time, on the hard drive of
          a computer or device. Persistent cookies also include those placed by a website other than
          the one the user is currently visiting - known as "third party cookies" - which can be
          used anonymously to store a user's interests, so that the most relevant advertising for
          the users is delivered.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>What are the benefits of cookies?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          A cookie contains information that links users to a particular website. If a browser
          accesses that web server again, it can read the already stored information and react
          accordingly.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>What is the lifetime of a cookie?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          There are cookies used exclusively for a single session - they are no longer retained
          after the user leaves the website. Permanent cookies - are retained and reused each time
          the user returns to that website, but can be deleted at any time by the user.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>What are third-party cookies?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Parts of content or services may be placed on the website accessed by third parties
          through banners, boxes or links - and all such tools may contain cookies. They are called
          "third party cookies" because they are not placed by the owner of the respective website,
          and the third party providers are subject to the laws in force and the privacy policies of
          the site owner.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>How are cookies used by this site?</Trans>
      </Title>
      <Paragraph>
        <Trans>A visit to this site may place cookies for the purposes of:</Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Cookies for the analysis of visitors</Trans>
        </li>
        <li>
          <Trans>Registration cookies</Trans>
        </li>
        <li>
          <Trans>Some cookies may come from third parties</Trans>.
        </li>
      </ul>
      <Title level={3}>
        <Trans>Cookies for the analysis of visitors</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Each time a user visits this site, the analytics software provided by a third party
          generates a user analysis cookie. This cookie tells us if you've visited this site before.
          The browser will tell us if you have this cookie, and if not, we will generate one. It
          allows monitoring of unique users who visit us and how often they do so. This cookie
          cannot be used to identify individuals, they are only used for statistical purposes.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Registration cookies</Trans>
      </Title>
      <Paragraph>
        <Trans>
          When you register on this site, we generate a cookie with your registration data. The
          cookie helps us in the next steps to communicate with the server. This cookie may remain
          on your device if you do not follow all the registration steps. However, this cookie will
          be overwritten the next time you try to register on this website.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Some cookies may come from third parties</Trans>
      </Title>
      <Paragraph>
        <Trans>
          On some pages, third parties may set their own anonymous cookies in order to track the
          success of an application, or to customize an application. Due to our usage, this site
          cannot access these cookies, just as third parties cannot access the cookies held by this
          site. For example, when you share a page using the social media button on this site, that
          social network will record your activity.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>What kind of information is stored and accessed through cookies?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookies store information in a small text file that allows a website to recognize a
          browser. The web server will recognize the browser until the cookie expires or is deleted.
          The cookie stores important information that enhances your browsing experience (eg a
          serial number for your donation).
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Why are cookies important for the Internet?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookies are the focal point of the efficient operation of the Internet, helping to
          generate a friendly browsing experience tailored to the preferences and interests of each
          user. Declining or disabling cookies may make some sites impossible to use.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Refusing or disabling cookies does not mean that you will no longer receive online
          advertising - only that it will no longer be able to take into account your preferences
          and interests, as evidenced by your browsing behavior.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Security and privacy issues</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookies are NOT viruses! They use plain text formats. They are not made up of pieces of
          code so they cannot be executed or run. As a result, they cannot be duplicated or
          replicated on other networks to run or replicate. Because they cannot perform these
          functions, they cannot be considered viruses.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          However, cookies may be used for negative purposes. Because it stores information about
          users' preferences and browsing history, both on one site and on several other sites,
          cookies can be used as a form of Spyware. Many anti-spyware products are aware of this and
          constantly mark cookies to be deleted during anti-virus/anti-spyware deletion/scanning
          procedures.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          In general, browsers have integrated privacy settings that provide different levels of
          acceptance of cookies, validity period and automatic deletion after the user has visited a
          particular site.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Other security issues related to cookies</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Because the protection of identity is very valuable and represents the right of every
          internet user, it is advisable to know what possible problems cookies can create. Because
          through them information is constantly transmitted in both directions between the browser
          and the website, if an attacker or unauthorized person intervenes during the transmission
          of data, the information contained in the cookie may be intercepted. Although very rare,
          this can happen if the browser connects to the server using an unencrypted network (eg an
          unsecured WiFi network).
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Other cookie-based attacks involve incorrect cookie settings on servers. If a website does
          not require the browser to use only encrypted channels, attackers can use this
          vulnerability to trick browsers into sending information through unsecured channels.
          Attackers then use the information to gain unauthorized access to certain sites. It is
          very important that you choose the most appropriate method of protecting your personal
          information.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Tips for safe and responsible browsing based on cookies</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Due to their flexibility and the fact that most of the most visited and largest sites use
          cookies, they are almost inevitable.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Disabling cookies will not allow the user to access the most common and used sites
          including Youtube, Gmail, Yahoo and others. Here are some tips that can help you navigate
          without worries but with the help of cookies:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>
            Customize your browser settings for cookies to reflect a comfortable level of cookie
            security for you. If cookies do not bother you and you are the only person using the
            computer, you can set long expiration dates for storing your browsing history and
            personal access data. If you share access to your computer, you can consider setting
            your browser to clear individual browsing data each time you close your browser. This is
            a way to access the sites that place cookies and to delete any visit information at the
            end of the browsing session.
          </Trans>
        </li>
        <li>
          <Trans>Install and constantly update your antispyware applications.</Trans>
        </li>
        <li>
          <Trans>
            Many of the spyware detection and prevention applications include site attack detection.
            This prevents the browser from accessing websites that could exploit browser
            vulnerabilities or download malicious software. Make sure your browser is always up to
            date. Many cookie-based attacks are exploited by exploiting the weaknesses of older
            versions of browsers.
          </Trans>
        </li>
      </ul>
      <Paragraph>
        <Trans>
          Cookies are everywhere and cannot be avoided if you want to enjoy access to the best and
          largest sites on the Internet - local or international. With a clear understanding of how
          they operate and the benefits they bring, you can take the necessary security measures so
          that you can surf the Internet with confidence.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>How can I turn off cookies?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Disabling and refusing to receive cookies may make certain sites impractical or difficult
          to visit and use. Also, refusing to accept cookies does not mean that you will no longer
          receive/view online advertising.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          It is possible to set in the browser so that these cookies are no longer accepted or you
          can set the browser to accept cookies from a specific site. But, for example, if you do
          not want to use cookies, you cannot follow the next steps after registering to fill in the
          form.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          All modern browsers offer the ability to change cookie settings. These settings are
          usually found in the "options" or "preferences" menu of your browser.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          For the settings of cookies generated by third parties, and for more information on the
          privacy related to online advertising, IAB Romania provides the following site:{' '}
          <Link to={{ pathname: 'http://www.youronlinechoices.com/ro/' }} target="_blank">
            http://www.youronlinechoices.com/ro/
          </Link>
        </Trans>
      </Paragraph>
    </div>
  );
};

export default PolicyFragment;
