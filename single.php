<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */

$categories = get_the_terms( get_the_ID(), 'faq-category' );

get_header();
?>
<main id="main" class="site-main single">
    <div class="archive-title-mobile">
        <a href="<?php echo esc_url( ! empty( $categories ) ? esc_url( get_category_link( $categories[0]->term_id ) ) : get_home_url() ); ?>">
            <div class="back-button">
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93949 7.4915L0 12.5994L1.73419 14.25L8.25 7.49163L1.73419 0.75L0 2.40065L4.93949 7.4915Z" />
                </svg>
            </div>
        </a>
        <h1>
        <?php echo esc_html( ! empty( $categories ) ? $categories[0]->name : 'Home' ); ?>
        </h1>
    </div>
    <div class="single-content">
        <div class="single-content-wrapper">
            <?php
				if ( function_exists( 'yoast_breadcrumb' ) ) {
					yoast_breadcrumb( '<p id="breadcrumbs">','</p>' );
				}
				?>
            <div class="archive-categories-title">
                <h1><?php the_title(); ?></h1>
            </div>
            <?php the_content(); ?>
        </div>
    </div>
</main><!-- #main -->
<?php
get_footer();
